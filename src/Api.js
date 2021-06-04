const API_URL = "https://medi-vr-api.vercel.app";

export async function getConversation(sender_id, timestamp) {
  return fetch(
    API_URL + `/api/conversation/${sender_id}/${timestamp}`
  ).then((res) => res.json());
}

export async function getSenders() {
  return fetch(API_URL + "/api/senders").then((res) => res.json());
}

export async function getChecklist(sender_id, timestamp) {
  return fetch(
    API_URL + `/api/checklist/${sender_id}/${timestamp}`
  ).then((res) => res.json());
}

export async function getChecklistTemplate() {
  return fetch(API_URL + "/api/checklisttemplate").then((res) => res.json());
}

export async function getSessions(sender_id) {
  return fetch(API_URL + "/api/sessions/" + sender_id).then((res) =>
    res.json()
  );
}

export async function deleteSession(sender_id, timestamp) {
  return fetch(API_URL + `/api/sessions/${sender_id}/${timestamp}`, {
    method: "DELETE"
  });
}

export async function deleteSender(sender_id) {
  return fetch(API_URL + `/api/senders/${sender_id}`, {
    method: "DELETE"
  });
}
