from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Pinecone
from langchain.document_loaders import UnstructuredFileLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.llms import LlamaCpp
import pinecone
import os

class DocumentRAGSystem:
    def __init__(self, pinecone_api_key, pinecone_environment, index_name):
        # Initialize Pinecone
        pinecone.init(api_key=pinecone_api_key, environment=pinecone_environment)
        
        # Initialize embeddings
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-mpnet-base-v2"
        )
        
        # Initialize vector store
        self.vectorstore = Pinecone.from_existing_index(
            index_name=index_name,
            embedding=self.embeddings
        )
        
        # Initialize LLM
        self.llm = LlamaCpp(
            model_path="path/to/llama/model.gguf",
            temperature=0.7,
            max_tokens=2000,
            top_p=1
        )
        
        # Initialize conversation memory
        self.memory = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True
        )
        
        # Initialize retrieval chain
        self.qa_chain = ConversationalRetrievalChain.from_llm(
            llm=self.llm,
            retriever=self.vectorstore.as_retriever(),
            memory=self.memory
        )

    def process_document(self, file_path, metadata=None):
        """Process and index a new document"""
        # Load document
        loader = UnstructuredFileLoader(file_path)
        document = loader.load()
        
        # Split text into chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        texts = text_splitter.split_documents(document)
        
        # Add metadata if provided
        if metadata:
            for text in texts:
                text.metadata.update(metadata)
        
        # Add to vector store
        self.vectorstore.add_documents(texts)
        
    def query_document(self, query: str) -> str:
        """Query the document knowledge base"""
        response = self.qa_chain({"question": query})
        return response["answer"]

    def clear_memory(self):
        """Clear conversation memory"""
        self.memory.clear()