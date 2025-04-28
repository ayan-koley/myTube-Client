const formatViews = (num) => {
    if(num > 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if(num > 1_000) return (num / 1_000).toFixed(1) + "k";
    return num;
}


import { formatDistanceToNow } from "date-fns";
const formatTime = (time) => {
    return formatDistanceToNow(new Date(time), {
        addSuffix: true
    })
}


const truncatTitle = (title) => {
    return title.length > 20 ? title.substring(0, 17) + "..." : title;
}

const addWidthOnImage = (originalUrl="", width=140) => {
    const cloudinaryUrlFormat = "http://res.cloudinary.com/dlcxr1p9c/image/upload/";
    const transformation = `c_scale,w_${width}/`;
    if(originalUrl.includes(cloudinaryUrlFormat)) {
        const parts = originalUrl.split(cloudinaryUrlFormat);
        return cloudinaryUrlFormat + transformation + parts[1];
    }   else {
        console.log("Invalid Url");
        return;
    }
}

export {formatViews, formatTime, truncatTitle, addWidthOnImage}
