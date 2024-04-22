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

export async function getAllNews() {
    const response = await fetch('https://kadam-myagdi-default-rtdb.asia-southeast1.firebasedatabase.app/news.json');
    const data = await response.json();

    const news = [];

    for (const key in data) {
        news.push({
            id: key,
            ...data[key]
        });
    }

    return news;
}

export async function addNewsToRealDB(id, data) {
    try{
        await fetch(`https://kadam-myagdi-default-rtdb.asia-southeast1.firebasedatabase.app/news/${id}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    } catch(err){
        console.log(err)
    }
}

export async function deleteNewsFromRealDB(id) {
    try{
        await fetch(`https://kadam-myagdi-default-rtdb.asia-southeast1.firebasedatabase.app/news/${id}.json`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
    } catch(err){
        console.log(err)
    }
}


export async function getNewsById(id) {
    const allNews = await getAllNews();
    return allNews.find((news) => news.id === id);
}