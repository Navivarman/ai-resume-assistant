
import pymupdf


MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB
MAX_PAGES = 30


def extract_pdf_text(pdf_bytes: bytes) -> str:

    if not pdf_bytes:
        raise ValueError("PDF file is empty.")

    if len(pdf_bytes) > MAX_FILE_SIZE:
        raise ValueError("PDF must be smaller than 5 MB.")

    if not pdf_bytes.startswith(b"%PDF-"):
        raise ValueError("Invalid PDF file.")

    try:
        with pymupdf.open(
            stream=pdf_bytes,
            filetype="pdf"
        ) as document:

            if document.is_encrypted:
                raise ValueError(
                    "Password-protected PDFs are not supported."
                )

            if document.page_count > MAX_PAGES:
                raise ValueError(
                    "PDF cannot contain more than 30 pages."
                )

            extracted_text = []

            for page in document:
                page_text = page.get_text("text")
                extracted_text.append(page_text)

            final_text = "\n".join(extracted_text).strip()

            if not final_text:
                raise ValueError(
                    "No readable text found in this PDF."
                )

            return final_text

    except ValueError:
        raise

    except Exception as exc:
        raise ValueError(
            "Unable to process the PDF."
        ) from exc
