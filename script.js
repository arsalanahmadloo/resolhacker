// script.js

// بارش کد سبز (Matrix Effect)
const canvas = document.createElement('canvas');
canvas.id = 'matrix';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const letters = 'ضصثقفغعهخحجچشسیبلاتنمکگظطزرذدپو1234567890@#$%^&*'.split('');
const fontSize = 14;
const columns = Math.floor(width / fontSize);

let drops = [];
for (let i = 0; i < columns; i++) drops[i] = 1;

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#00ff00';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(draw, 50);

// ابزارها و پنل

const terminal = document.getElementById('terminal');

function appendOutput(text) {
  terminal.textContent += text + '\n';
  terminal.scrollTop = terminal.scrollHeight;
}

// ساخت رمز عبور قوی
function generatePassword(length = 16) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~';
  let pass = '';
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
}

// رمزگشایی Base64
function decodeBase64(input) {
  try {
    return atob(input);
  } catch {
    return 'رمزگذاری Base64 نامعتبر است';
  }
}

// اجرای پینگ شبیه‌سازی شده
function ping(ip) {
  appendOutput(`شروع پینگ به ${ip} ...`);
  setTimeout(() => {
    appendOutput(`پینگ موفق! زمان پاسخ: ${Math.floor(Math.random() * 100)}ms`);
  }, 1000);
}

// مدیریت نمایش ابزارها

function runTool(tool) {
  terminal.textContent = '';
  switch (tool) {
    case 'ping':
      let ip = prompt('لطفا آی‌پی وارد کنید:');
      if (ip) ping(ip);
      break;
    case 'password':
      appendOutput('رمز عبور تولید شده: ' + generatePassword());
      break;
    case 'base64':
      let encoded = prompt('متن Base64 را وارد کنید:');
      if (encoded) appendOutput('متن رمزگشایی شده: ' + decodeBase64(encoded));
      break;
    default:
      appendOutput('ابزار نامعتبر است');
  }
}
