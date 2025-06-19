// ステップ制御
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const steps = document.querySelectorAll('.step-item');

document.getElementById('next1').onclick = (e) => {
  e.preventDefault();
  step1.classList.add('hidden');
  step2.classList.remove('hidden');
  steps[0].classList.remove('step-active');
  steps[1].classList.add('step-active');
  fakeSearch();           // ダミー進捗
};
document.getElementById('back2').onclick = () => {
  step2.classList.add('hidden');
  step1.classList.remove('hidden');
  steps[1].classList.remove('step-active');
  steps[0].classList.add('step-active');
};
document.getElementById('next2').onclick = () => {
  step2.classList.add('hidden');
  step3.classList.remove('hidden');
  steps[1].classList.remove('step-active');
  steps[2].classList.add('step-active');
  fakeAI();
};

// ダミー進捗 (実際は API 呼び出し)
function fakeSearch() {
  const bar = document.getElementById('progress-search');
  let i = 0;
  const interval = setInterval(() => {
    bar.value = ++i;
    if (i >= 100) { clearInterval(interval);
      document.getElementById('result-search').textContent =
        '検索完了：サンプル事例3件を取得しました。';
    }
  }, 15);
}
function fakeAI() {
  const bar = document.getElementById('progress-ai');
  let i = 0;
  const interval = setInterval(() => {
    bar.value = ++i;
    if (i >= 100) { clearInterval(interval);
      document.getElementById('result-ai').textContent =
        'AI がカスタマイズ提案を生成しました！';
    }
  }, 20);
}

// === Make Webhook 送信 ===
document.getElementById('submit').onclick = async () => {
  // フォーム値を取得（新しいフィールドに対応）
  const formData = new FormData(step1);
  const data = {
    company: formData.get('company'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    employees: formData.get('employees'),
    industry: formData.get('industry'),
    challenges: formData.get('challenges'),
    budget: formData.get('budget'),
    timeline: formData.get('timeline'),
    details: formData.get('details')
  };
  
  const res = await fetch(
    'https://hook.us2.make.com/5jydmswcjubg2dd58vmi2lm2us99dis3',  // ← Make で生成した URL
    { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data) }
  );
  if (res.ok) alert('送信完了！後ほどメールをお送りします。');
};
