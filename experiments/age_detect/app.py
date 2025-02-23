
import gradio as gr
import pdfplumber
import re
from datetime import datetime
import pytesseract
from PIL import Image
import io
import os
import cv2
import numpy as np
import tempfile

def preprocess_image(image):
    gray = cv2.cvtColor(np.array(image), cv2.COLOR_BGR2GRAY)
    _, binary = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
    return Image.fromarray(binary)

class DocumentAgeExtractor:
    def __init__(self):
        self.age_keywords = [
            r'age[:\s]+(\d+)',
            r'(\d+)\s+years?\s+old',
            r'date\s+of\s+birth[:\s]+(\d{2}[-/]\d{2}[-/]\d{4})',
            r'(?:dob|date\s+of\s+birth)[:\s]*(\d{2}[-/]\d{2}[-/]\d{4})',
            r'born\s+on[:\s]+(\d{2}[-/]\d{2}[-/]\d{4})'
        ]

    def extract_age_from_pdf(self, pdf_path):
        try:
            with pdfplumber.open(pdf_path) as pdf:
                text = ''
                for page in pdf.pages:
                    text += page.extract_text() or ''
                    
                    if page.images:
                        for img in page.images:
                            image_data = img['stream'].get_data()
                            image = Image.open(io.BytesIO(image_data))
                            text += pytesseract.image_to_string(image)

                return self._process_text(text)
                
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'age': None,
                'confidence': 0,
                'method': None
            }

    def _process_text(self, text):
        result = {
            'success': False,
            'age': None,
            'confidence': 0,
            'method': None
        }

        for pattern in self.age_keywords[:2]:
            matches = re.finditer(pattern, text.lower())
            for match in matches:
                age = int(match.group(1))
                if 0 <= age <= 120:
                    result.update({
                        'success': True,
                        'age': age,
                        'confidence': 0.9,
                        'method': 'direct_mention'
                    })
                    return result

        for pattern in self.age_keywords[2:]:
            matches = re.finditer(pattern, text.lower())
            for match in matches:
                try:
                    dob_str = match.group(1)
                    for fmt in ['%d-%m-%Y', '%d/%m/%Y', '%m-%d-%Y', '%m/%d/%Y']:
                        try:
                            dob = datetime.strptime(dob_str, fmt)
                            age = self._calculate_age(dob)
                            result.update({
                                'success': True,
                                'age': age,
                                'confidence': 0.85,
                                'method': 'dob_calculation'
                            })
                            return result
                        except ValueError:
                            continue
                except Exception:
                    continue

        return result

    def _calculate_age(self, dob):
        today = datetime.today()
        age = today.year - dob.year
        if today.month < dob.month or (today.month == dob.month and today.day < dob.day):
            age -= 1
        return age

def process_pdf(pdf_file):
    if pdf_file is None:
        return {
            "error": "Please upload a PDF file",
            "age": None,
            "confidence": None,
            "method": None
        }
    
    try:
        # Create a temporary file to save the uploaded PDF
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_pdf:
            temp_pdf.write(pdf_file)
            temp_pdf_path = temp_pdf.name

        # Initialize extractor and process the PDF
        extractor = DocumentAgeExtractor()
        result = extractor.extract_age_from_pdf(temp_pdf_path)
        
        # Clean up the temporary file
        os.unlink(temp_pdf_path)
        
        if result['success']:
            return {
                "error": None,
                "age": result['age'],
                "confidence": f"{result['confidence']*100:.1f}%",
                "method": result['method'].replace('_', ' ').title()
            }
        else:
            return {
                "error": "Could not extract age from the document",
                "age": None,
                "confidence": None,
                "method": None
            }
            
    except Exception as e:
        return {
            "error": f"Error processing PDF: {str(e)}",
            "age": None,
            "confidence": None,
            "method": None
        }

# Create the Gradio interface
with gr.Blocks(theme=gr.themes.Soft()) as app:
    gr.Markdown(
        """
        # 📄 Document Age Extractor
        Upload a PDF document containing age or date of birth information, and this tool will extract the person's age.
        
        ### Supported Formats:
        - Direct age mention (e.g., "age: 25", "30 years old")
        - Date of birth (e.g., "DOB: 01-01-1990", "Born on: 01/01/1990")
        """
    )
    
    with gr.Row():
        with gr.Column():
            pdf_input = gr.File(
                label="Upload PDF Document",
                file_types=[".pdf"],
                type="binary"
            )
            submit_btn = gr.Button("Extract Age", variant="primary")
            
        with gr.Column():
            with gr.Group():
                error_output = gr.Textbox(label="Status", interactive=False)
                age_output = gr.Number(label="Extracted Age", interactive=False)
                confidence_output = gr.Textbox(label="Confidence", interactive=False)
                method_output = gr.Textbox(label="Extraction Method", interactive=False)

    # Handle file upload and processing
    submit_btn.click(
        fn=process_pdf,
        inputs=[pdf_input],
        outputs=[
            gr.JSON({
                "error": error_output,
                "age": age_output,
                "confidence": confidence_output,
                "method": method_output
            })
        ]
    )
    
    gr.Markdown(
        """
        ### Notes:
        - The tool works best with clearly formatted documents
        - Supports both text-based PDFs and PDFs containing images
        - Higher confidence scores indicate more reliable extractions
        """
    )

if __name__ == "__main__":
    app.launch()