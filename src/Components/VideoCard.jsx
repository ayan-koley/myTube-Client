import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { formatViews, formatTime, truncatTitle, addWidthOnImage } from "../Utils/utilsFunc";
import UserAvatar from "./UserAvatar";
import { useEffect, useState } from "react";

function VideoCard({
  thumbnail,
  username,
  avatar,
  title,
  createdAt,
  views,
  className = "",
}) {
  const [thumbnailState, setThumbnailState] = useState(thumbnail);
  const [avatarState, setAvatarState] = useState(avatar);
  const formattedViews = formatViews(views);
  const formattedTime = formatTime(createdAt);
  const truncatedTitle = truncatTitle(title);
  
  console.log(thumbnail);
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: '2px 5px 15px rgba(255, 255, 255, 0.5);',
        backgroundColor: "#1e1e1e",
        color: "white",
      }}
      className={`w-80 md:w-70 sm-2:w-90 lg-2:w-80 !${className}`}
    >
      <CardMedia
        component="img"
        className="h-35 !object-fill"
        image={thumbnailState}
        alt={title}
      />
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid >
            <UserAvatar username={username} src={avatarState} />
          </Grid>
          <Grid >
            <Typography variant="subtitle1">{truncatedTitle}</Typography>
            <Typography variant="caption" color="gray">
              {username} • {formattedViews} views • {formattedTime}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default VideoCard;
