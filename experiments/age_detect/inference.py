
import pdfplumber
import re
from datetime import datetime
import pytesseract
from PIL import Image
import io
import os
import cv2

import numpy as np

def preprocess_image(image):
    # Convert to grayscale
    gray = cv2.cvtColor(np.array(image), cv2.COLOR_BGR2GRAY)
    # Apply thresholding
    _, binary = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
    return Image.fromarray(binary)

class DocumentAgeExtractor:
    def __init__(self):
        # Common age-related keywords to look for
        self.age_keywords = [
            r'age[:\s]+(\d+)',
            r'(\d+)\s+years?\s+old',
            r'date\s+of\s+birth[:\s]+(\d{2}[-/]\d{2}[-/]\d{4})',
            # r'dob[:\s]+(\d{2}[-/]\d{2}[-/]\d{4})',
            r'(?:dob|date\s+of\s+birth)[:\s]*(\d{2}[-/]\d{2}[-/]\d{4})',
            r'born\s+on[:\s]+(\d{2}[-/]\d{2}[-/]\d{4})'
        ]

    def extract_age_from_pdf(self, pdf_path):
        
        try:
            with pdfplumber.open(pdf_path) as pdf:
                text = ''
                for page in pdf.pages:
                    # Extract text from the page
                    text += page.extract_text() or ''
                    
                    
                    if page.images:
                        for img in page.images:
                            # Convert PDFStream to bytes
                            image_data = img['stream'].get_data()
                            image = Image.open(io.BytesIO(image_data))
                            text += pytesseract.image_to_string(image)


                # print(text)
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
        """Process extracted text to find age information."""
        result = {
            'success': False,
            'age': None,
            'confidence': 0,
            'method': None
        }

        # Method 1: Direct age mention
        for pattern in self.age_keywords[:2]:  # First two patterns are direct age mentions
            matches = re.finditer(pattern, text.lower())
            for match in matches:
                age = int(match.group(1))
                if 0 <= age <= 120:  # Basic age validation
                    result.update({
                        'success': True,
                        'age': age,
                        'confidence': 0.9,
                        'method': 'direct_mention'
                    })
                    return result

        # Method 2: Calculate age from DOB
        for pattern in self.age_keywords[2:]:  # Last patterns are DOB patterns
            matches = re.finditer(pattern, text.lower())
            for match in matches:
                try:
                    dob_str = match.group(1)
                    # Handle different date formats
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
        """Calculate age from date of birth."""
        today = datetime.today()
        age = today.year - dob.year
        # Adjust age if birthday hasn't occurred this year
        if today.month < dob.month or (today.month == dob.month and today.day < dob.day):
            age -= 1
        return age
    
# Initialize the extractor
extractor = DocumentAgeExtractor()

# Extract age from a PDF
result = extractor.extract_age_from_pdf("Aadhar card and du payment slip.pdf")

if result['success']:
    print(f"Age: {result['age']}")
    print(f"Confidence: {result['confidence']}")
    print(f"Method: {result['method']}")
else:
    print(f"Error: {result.get('error', 'Age not found')}")