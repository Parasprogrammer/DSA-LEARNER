export function analyzeCode(code, language = 'javascript') {
  if (!code || code.trim().length === 0) {
    return {
      score: 0,
      grade: 'N/A',
      color: 'text-slate-500',
      feedback: [{ text: "No code provided to analyze.", type: "warning" }]
    };
  }

  let score = 100;
  const feedback = [];
  const lines = code.split('\n');
  const codeStr = code.trim();

  // 1. Check for Comments (Bonus or slight penalty if missing)
  let hasComments = false;
  if (language === 'python') {
    hasComments = /#|"""|'''/.test(codeStr);
  } else {
    // JS and C++
    hasComments = /\/\/|\/\*/.test(codeStr);
  }

  if (hasComments) {
    feedback.push({ text: "Great job including comments to explain your logic!", type: "success" });
  } else {
    score -= 10;
    feedback.push({ text: "Consider adding comments to make your code more readable.", type: "warning" });
  }

  // 2. Language-Specific Checks
  if (language === 'javascript') {
    if (/\bvar\b/.test(codeStr)) {
      score -= 15;
      feedback.push({ text: "Avoid using 'var'. Use 'let' or 'const' for block-scoped variables.", type: "error" });
    } else {
      feedback.push({ text: "Good use of block-scoped variables (let/const).", type: "success" });
    }
  } else if (language === 'cpp') {
    if (!/#include\s*<.*>/.test(codeStr)) {
      score -= 5;
      feedback.push({ text: "Missing #include directives. Ensure you have included necessary libraries.", type: "warning" });
    }
    if (/\busing namespace std;\b/.test(codeStr)) {
      score -= 5;
      feedback.push({ text: "'using namespace std;' is generally discouraged in header files or large projects.", type: "warning" });
    }
  } else if (language === 'python') {
    if (/\bdef\s+[A-Z][a-zA-Z0-9]*\b/.test(codeStr)) {
      score -= 5;
      feedback.push({ text: "In Python, functions should typically use snake_case rather than PascalCase/camelCase.", type: "warning" });
    }
  }

  // 3. Indentation Check
  let indentationLooksGood = true;
  
  if (language === 'python') {
    // Python indentation heuristic
    let previousIndent = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim().length === 0 || line.trim().startsWith('#')) continue;
      
      const currentIndent = line.search(/\S|$/);
      if (currentIndent > previousIndent) {
        // Did previous line end with ':'?
        let prevLine = '';
        let j = i - 1;
        while(j >= 0 && (lines[j].trim().length === 0 || lines[j].trim().startsWith('#'))) j--;
        if (j >= 0) prevLine = lines[j].trim();
        
        if (!prevLine.endsWith(':')) {
          indentationLooksGood = false;
          break;
        }
      }
      previousIndent = currentIndent;
    }
  } else {
    // JS/C++ indentation heuristic
    let indentCount = 0;
    for (const line of lines) {
      if (line.trim().endsWith('{')) {
        indentCount++;
      } else if (line.trim().startsWith('}')) {
        indentCount--;
      }
      
      if (indentCount > 0 && line.trim().length > 0 && !line.trim().startsWith('}') && !line.startsWith(' ') && !line.startsWith('\t')) {
        indentationLooksGood = false;
        break;
      }
    }
  }

  if (indentationLooksGood) {
    feedback.push({ text: "Code indentation looks clean.", type: "success" });
  } else {
    score -= 15;
    feedback.push({ text: "Inconsistent or missing indentation detected. Properly align your code blocks.", type: "error" });
  }

  // 4. Meaningful Variable Names (Penalize single letter vars except i, j, k, x, y, n, m)
  let singleLetterVars = null;
  if (language === 'javascript') {
    singleLetterVars = codeStr.match(/\b(?:let|const|var)\s+([^ijkxynm\s])\s*(?:=|;|,)/g);
  } else if (language === 'cpp') {
    singleLetterVars = codeStr.match(/\b(?:int|float|double|char|string|auto)\s+([^ijkxynm\s])\s*(?:=|;|,)/g);
  } else if (language === 'python') {
    singleLetterVars = codeStr.match(/\b([^ijkxynm\s])\s*=\s*/g);
  }

  if (singleLetterVars && singleLetterVars.length > 0) {
    score -= 10;
    feedback.push({ text: "Avoid single-letter variable names (except i, j, k in loops). Use descriptive names.", type: "warning" });
  }

  // 5. Function Length (Heuristic checking lines between {} or after def)
  let tooLong = false;
  if (language === 'python') {
    const blocks = codeStr.split(/\bdef\s/);
    for (let i = 1; i < blocks.length; i++) {
      if (blocks[i].split('\n').length > 30) {
        tooLong = true;
        break;
      }
    }
  } else {
    const functionBlocks = codeStr.match(/(?:function|auto|int|void|float|double|string)\s*\w*\s*\([^)]*\)\s*{[^}]*}/g) || [];
    for (const block of functionBlocks) {
      if (block.split('\n').length > 30) {
        tooLong = true;
        break;
      }
    }
  }

  if (tooLong) {
    score -= 10;
    feedback.push({ text: "Some functions are quite long (>30 lines). Consider breaking them into smaller helper functions.", type: "warning" });
  }

  // 6. Print / Console.logs check
  if (language === 'javascript' && /\bconsole\.log\b/.test(codeStr)) {
    score -= 5;
    feedback.push({ text: "Leftover console.log() statements found. Remove them for production-ready code.", type: "warning" });
  }
  
  if (language === 'python' && /\bprint\(/.test(codeStr)) {
    score -= 5;
    feedback.push({ text: "Leftover print() statements found. Consider removing debug prints.", type: "warning" });
  }
  
  if (language === 'cpp' && /\bcout\b/.test(codeStr)) {
    score -= 5;
    feedback.push({ text: "Leftover cout statements found. Consider removing debug prints.", type: "warning" });
  }

  // Ensure score stays within bounds
  score = Math.max(0, Math.min(100, score));

  // Determine Grade and Color
  let grade, color;
  if (score >= 90) {
    grade = 'A';
    color = 'text-status-success'; // Green
  } else if (score >= 80) {
    grade = 'B';
    color = 'text-brand-cyan'; // Blue
  } else if (score >= 60) {
    grade = 'C';
    color = 'text-status-warning'; // Yellow
  } else {
    grade = 'F';
    color = 'text-status-error'; // Red
  }

  return { score, grade, color, feedback };
}
