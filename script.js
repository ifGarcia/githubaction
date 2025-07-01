let accessData = {};
let shaAtual = "";

async function carregar() {
  const token = document.getElementById("token").value;
  const repo = document.getElementById("repo").value;
  const branch = document.getElementById("branch").value;
  const filepath = document.getElementById("filepath").value;

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json"
  };

  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${filepath}?ref=${branch}`, { headers });
  const data = await res.json();
  shaAtual = data.sha;
  const content = JSON.parse(atob(data.content));

  accessData = content;
  document.getElementById("editor").style.display = "block";

  const org = Object.keys(content)[0];
  const workflows = content[org];
  const container = document.getElementById("workflow-list");
  container.innerHTML = "";

  Object.entries(workflows).forEach(([wf, perms]) => {
    const div = document.createElement("div");
    div.className = "workflow";
    div.innerHTML = `
      <strong>${wf}</strong><br/>
      <label>allowed_users:</label>
      <textarea data-wf="${wf}" data-type="users">${perms.allowed_users.join(", ")}</textarea>
      <label>allowed_teams:</label>
      <textarea data-wf="${wf}" data-type="teams">${perms.allowed_teams.join(", ")}</textarea>
    `;
    container.appendChild(div);
  });
}

function preVisualizar() {
  const org = Object.keys(accessData)[0];
  const newData = {};
  newData[org] = {};

  document.querySelectorAll(".workflow").forEach(div => {
    const wf = div.querySelector("textarea").dataset.wf;
    const users = div.querySelector("textarea[data-type='users']").value.split(",").map(s => s.trim()).filter(Boolean);
    const teams = div.querySelector("textarea[data-type='teams']").value.split(",").map(s => s.trim()).filter(Boolean);
    newData[org][wf] = {
      allowed_users: users,
      allowed_teams: teams
    };
  });

  document.getElementById("preview-json").textContent = JSON.stringify(newData, null, 2);
  document.getElementById("preview").style.display = "block";
}

async function salvar() {
  const token = document.getElementById("token").value;
  const repo = document.getElementById("repo").value;
  const branch = document.getElementById("branch").value;
  const filepath = document.getElementById("filepath").value;

  const org = Object.keys(accessData)[0];
  const newData = {};
  newData[org] = {};

  document.querySelectorAll(".workflow").forEach(div => {
    const wf = div.querySelector("textarea").dataset.wf;
    const users = div.querySelector("textarea[data-type='users']").value.split(",").map(s => s.trim()).filter(Boolean);
    const teams = div.querySelector("textarea[data-type='teams']").value.split(",").map(s => s.trim()).filter(Boolean);
    newData[org][wf] = {
      allowed_users: users,
      allowed_teams: teams
    };
  });

  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(newData, null, 2))));
  const payload = {
    message: "� Atualiza access_control.json via página web",
    content: encoded,
    sha: shaAtual,
    branch: branch
  };

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json"
  };

  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${filepath}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    alert("✅ Commit realizado com sucesso!");
  } else {
    const err = await res.json();
    alert("❌ Erro: " + err.message);
  }
}
