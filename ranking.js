
// ctrl + ` to show the terminal
const loader = document.getElementById('loader');
const rankingArea = document.getElementById('user-content-area');
const rankingDiv = document.getElementById('ranking-div')
let avgArr = [];

fetch('https://script.googleusercontent.com/macros/echo?user_content_key=i7Onz-aJ1_xNNp5JP9SrNaRqDuKGyFZztDkOdGUDnhMuCnv5JhvfCHRCJWHkCJBaOMfIFDf5cviCMfgfKpQuaas8jF1yjwhAm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnODCNqygfkkrHh1mTBhDHqZkjsk-mYo9vdOzeHj5AGy9Y0O3FbcTYeji5s0Ca5hiR59U0_W4_deaHD1dAQ-gvCn5Uj8bW7vOxg&lib=MTSpZjyWTfXf996pC7Nkk3Zj8bPnJHMmz')
    .then(response => response.json())
    .then(data => 
    {
        
        // console.log(data)
        let singleUserData = data.map(function (singleUser){
                        
        const userScore = singleUser[1].split(',');

        const total = userScore.reduce((pre, curr)=> {
            return  pre + parseFloat(curr);
        }, 0)
        const avg = total * 100/(userScore.length * 10);
                
        avgArr.push(
            {user: singleUser[0], scores: avg, totalSubmit: userScore.length}
        )
        })
        
        const rank = avgArr.sort((a, b) => b.scores - a.scores);
        
        const finalRanking = rank.map((singleRank, index)=> {
        
        const tr = document.createElement('tr');
        tr.className = 'bg-blue-100';
        tr.innerHTML = `
        <tr>
                  <th>${index + 1}</th>
                  <td>${singleRank.user}</td>
                  <td>${singleRank.totalSubmit}</td>
                  <td>${singleRank.scores.toFixed(2)} %</td>
        </tr>

        `
        rankingArea.appendChild(tr)
        })

        loader.classList.add('hidden');
        rankingDiv.classList.remove('hidden');
        
    }
              
        
    );

  