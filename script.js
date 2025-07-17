const STORAGE_KEYS = {
  matNet: 'matNet',
  turNet: 'turNet',
  siralama: 'siralama'
};

function loadData() {
  const mat = localStorage.getItem(STORAGE_KEYS.matNet);
  const tur = localStorage.getItem(STORAGE_KEYS.turNet);
  const sir = localStorage.getItem(STORAGE_KEYS.siralama);
  return {
    matNet: mat ? JSON.parse(mat) : [],
    turNet: tur ? JSON.parse(tur) : [],
    siralama: sir ? JSON.parse(sir) : []
  };
}

function saveData() {
  localStorage.setItem(STORAGE_KEYS.matNet, JSON.stringify(matNet));
  localStorage.setItem(STORAGE_KEYS.turNet, JSON.stringify(turNet));
  localStorage.setItem(STORAGE_KEYS.siralama, JSON.stringify(siralama));
}

let { matNet, turNet, siralama } = loadData();

let netChart, rankingChart;
document.addEventListener('DOMContentLoaded', function() {
  initializeCharts();
  updateTable();
  updateStats();
});

function initializeCharts() {
  netChart = new Chart(document.getElementById('netChart'), {
    type: 'line',
    data: {
      labels: generateLabels(),
      datasets: [
        {
          label: 'Matematik Net',
          data: matNet,
          borderColor: '#4a90e2',
          backgroundColor: 'rgba(74, 144, 226, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#4a90e2',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4
        },
        {
          label: 'Türkçe Net',
          data: turNet,
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#28a745',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 0,
      aspectRatio: 1.5,
      plugins: {
        legend: {
          labels: {
            color: '#d8dee9',
            font: {
              size: 12
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#b0b0b0',
            font: {
              size: 9
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        y: {
          ticks: {
            color: '#b0b0b0',
            font: {
              size: 9
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    }
  });

  rankingChart = new Chart(document.getElementById('rankingChart'), {
    type: 'line',
    data: {
      labels: generateLabels(),
      datasets: [
        {
          label: 'Sıralama (küçük daha iyi)',
          data: siralama,
          borderColor: '#ffc107',
          backgroundColor: 'rgba(255, 193, 7, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#ffc107',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 0,
      aspectRatio: 1.5,
      plugins: {
        legend: {
          labels: {
            color: '#d8dee9',
            font: {
              size: 12
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#b0b0b0',
            font: {
              size: 9
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        y: {
          reverse: true,
          ticks: {
            color: '#b0b0b0',
            font: {
              size: 9
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    }
  });
}

function generateLabels() {
  return matNet.map((_, i) => `${i + 1}. Deneme`);
}

function addData() {
  const mat = parseFloat(document.getElementById('matInput').value);
  const tur = parseFloat(document.getElementById('turInput').value);
  const sir = parseInt(document.getElementById('sirInput').value);

  if (!isNaN(mat) && !isNaN(tur) && !isNaN(sir)) {
    if (mat < 0 || mat > 50) {
      alert("Matematik neti 0-50 arasında olmalıdır!");
      return;
    }
    if (tur < 0 || tur > 50) {
      alert("Türkçe neti 0-50 arasında olmalıdır!");
      return;
    }
    if (sir < 1) {
      alert("Sıralama en az 1 olmalıdır!");
      return;
    }

    matNet.push(mat);
    turNet.push(tur);
    siralama.push(sir);

    saveData(); 
    updateAll();
    clearInputs();
    
    showSuccessMessage("Yeni deneme başarıyla eklendi!");
  } else {
    alert("Lütfen tüm alanları doğru ve eksiksiz doldurun.");
  }
}

function addTestData() {
  const testMat = [40, 43.25, 33, 35.75, 44, 39.75, 33.25, 32.5, 36.0, 34.25, 37.75, 36.0, 35.5, 31.75, 43.0, 33.5, 36.0, 33.25, 38.5];
  const testTur = [27.5, 19.5, 26, 20.75, 18, 24.75, 23.5, 17.25, 20.0, 21.75, 19.0, 16.5, 18.75, 28.25, 27.0, 23.75, 21.25, 20.75, 26.75];
  const testSir = [388, 241, 2328, 1599, 199, 476, 2481, 3743, 1569, 2144, 1099, 1876, 1882, 3009, 148, 2319, 1479, 2780,598];

  matNet = matNet.concat(testMat);
  turNet = turNet.concat(testTur);
  siralama = siralama.concat(testSir);
  saveData();
  updateAll();
  showSuccessMessage("Test verileri eklendi!");
}

function clearAllData() {
  if (confirm("Tüm kayıtlar silinsin mi? Bu işlem geri alınamaz!")) {
    matNet = [];
    turNet = [];
    siralama = [];
    saveData();
    updateAll();
    showSuccessMessage("Tüm veriler silindi!");
  }
}

function deleteData(index) {
  if (confirm(`${index + 1}. denemeyi silmek istediğinizden emin misiniz?`)) {
    matNet.splice(index, 1);
    turNet.splice(index, 1);
    siralama.splice(index, 1);
    saveData(); 
    updateAll();
    showSuccessMessage("Deneme başarıyla silindi!");
  }
}

function updateAll() {
  netChart.data.labels = generateLabels();
  netChart.data.datasets[0].data = matNet;
  netChart.data.datasets[1].data = turNet;
  netChart.update('active');

  rankingChart.data.labels = generateLabels();
  rankingChart.data.datasets[0].data = siralama;
  rankingChart.update('active');

  updateStats();
  updateTable();
}

function updateTable() {
  const tbody = document.querySelector('#recordsTable tbody');
  tbody.innerHTML = '';
  
  matNet.forEach((m, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${i + 1}</td>
      <td style="color: #4a90e2; font-weight: bold;">${m}</td>
      <td style="color: #28a745; font-weight: bold;">${turNet[i]}</td>
      <td style="color: #ffc107; font-weight: bold;">${siralama[i]}</td>
      <td><button onclick="deleteData(${i})" title="Bu denemeyi sil">🗑️ Sil</button></td>
    `;
    tbody.appendChild(row);
  });
}

function updateStats() {
  const matAvg = (matNet.reduce((a, b) => a + b, 0) / matNet.length).toFixed(2);
  const turAvg = (turNet.reduce((a, b) => a + b, 0) / turNet.length).toFixed(2);
  const sirAvg = Math.round(siralama.reduce((a, b) => a + b, 0) / siralama.length);
  
  const matMax = Math.max(...matNet).toFixed(2);
  const matMin = Math.min(...matNet).toFixed(2);
  const turMax = Math.max(...turNet).toFixed(2);
  const turMin = Math.min(...turNet).toFixed(2);
  const sirBest = Math.min(...siralama);
  const sirWorst = Math.max(...siralama);
  
  const statsDisplay = document.getElementById('statsDisplay');
  statsDisplay.innerHTML = `
    <div>
      <div class="stat-label">📊 Matematik</div>
      <div class="stat-value">Ort: ${matAvg}</div>
      <div style="font-size: 0.8em; color: #28a745;">En iyi: ${matMax}</div>
      <div style="font-size: 0.8em; color: #dc3545;">En kötü: ${matMin}</div>
    </div>
    <div>
      <div class="stat-label">📚 Türkçe</div>
      <div class="stat-value">Ort: ${turAvg}</div>
      <div style="font-size: 0.8em; color: #28a745;">En iyi: ${turMax}</div>
      <div style="font-size: 0.8em; color: #dc3545;">En kötü: ${turMin}</div>
    </div>
    <div>
      <div class="stat-label">🎯 Sıralama</div>
      <div class="stat-value">Ort: ${sirAvg}</div>
      <div style="font-size: 0.8em; color: #28a745;">En iyi: ${sirBest}</div>
      <div style="font-size: 0.8em; color: #dc3545;">En kötü: ${sirWorst}</div>
    </div>
    <div>
      <div class="stat-label">📈 Toplam</div>
      <div class="stat-value">${matNet.length} Deneme</div>
      <div style="font-size: 0.8em; color: #6c757d;">Son trend: ${getTrend()}</div>
    </div>
  `;
}

function getTrend() {
  if (matNet.length < 3) return "Yetersiz veri";
  
  const lastThree = matNet.slice(-3);
  const avg = lastThree.reduce((a, b) => a + b, 0) / lastThree.length;
  const firstThree = matNet.slice(0, 3);
  const firstAvg = firstThree.reduce((a, b) => a + b, 0) / firstThree.length;
  
  if (avg > firstAvg + 2) return "📈 Yükselişte";
  if (avg < firstAvg - 2) return "📉 Düşüşte";
  return "📊 Stabil";
}

function clearInputs() {
  document.getElementById('matInput').value = '';
  document.getElementById('turInput').value = '';
  document.getElementById('sirInput').value = '';
}

function showSuccessMessage(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4a90e2;
    color: white;
    padding: 12px 20px;
    border-radius: 4px;
    z-index: 1000;
    animation: slideIn 0.5s ease-out;
  `;
  notification.textContent = message;
  
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

document.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    if (e.target.tagName === 'INPUT') {
      addData();
    }
  }
});

 