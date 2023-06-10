export async function getAllNotices() {
    const response = await fetch('https://kadam-myagdi-default-rtdb.asia-southeast1.firebasedatabase.app/notices.json');
    const data = await response.json();

    const notices = [];

    for (const key in data) {
        notices.push({
            id: key,
            ...data[key]
        });
    }

    return notices;
}


export async function getNoticeById(id) {
    const allNotices = await getAllNotices();
    return allNotices.find((notice) => notice.id === id);
}