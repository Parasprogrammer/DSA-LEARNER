import sys
import subprocess

try:
    import markdown
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "markdown"])
    import markdown

with open("Sudoku_Solver_Project_Report.md", "r", encoding="utf-8") as f:
    md_content = f.read()

html_content = markdown.markdown(md_content, extensions=['extra'])

doc_content = f"""<html>
<head>
    <meta charset="utf-8">
</head>
<body>
{html_content}
</body>
</html>"""

with open("Sudoku_Solver_Project_Report.doc", "w", encoding="utf-8") as f:
    f.write(doc_content)

print("DOC file created successfully.")
