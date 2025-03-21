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

export {formatViews, formatTime, truncatTitle}
