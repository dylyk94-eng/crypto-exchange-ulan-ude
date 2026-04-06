#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys
from pathlib import Path

# Проверим наличие библиотеки PyPDF2
try:
    import PyPDF2
    print("[OK] PyPDF2 imported successfully")
except ImportError:
    print("[ERROR] PyPDF2 not installed")
    print("Install: pip install PyPDF2")
    sys.exit(1)

# Проверим наличие файла
pdf_path = Path(r"C:\Users\dylyk\.openclaw\workspace\crypto-exchange-ulan-ude-github\ruclan_1.pdf")
if not pdf_path.exists():
    print(f"[ERROR] File not found: {pdf_path}")
    sys.exit(1)

print(f"[FILE] {pdf_path}")
print(f"[SIZE] {pdf_path.stat().st_size} bytes")

# Попробуем открыть PDF
try:
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        print(f"[PAGES] {len(reader.pages)} pages found")

        for page_num, page in enumerate(reader.pages[:10], 1):
            text = page.extract_text()
            print(f"\n[PAGE {page_num}]")
            print(f"[TEXT LENGTH] {len(text)} characters")
            if text.strip():
                print(f"[FIRST 500 CHARS]\n{text[:500]}")
            else:
                print("[WARNING] No text found (possible image-only page)")
except Exception as e:
    print(f"[ERROR] Failed to open PDF: {e}")
    print(f"[EXCEPTION TYPE] {type(e).__name__}")
