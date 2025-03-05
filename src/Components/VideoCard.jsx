import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Avatar,
} from "@mui/material";

import { formatDistanceToNow } from "date-fns";
import Grid from "@mui/material/Grid2";

function VideoCard({ thumbnail, username, avatar, title, createdAt, views }) {
  const formatViews = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num;
  };
  const formattedTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });
  const formattedViews = formatViews(views);
  const truncatedTitle =
    title.length > 20 ? title.substring(0, 17) + "..." : title;
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#1e1e1e",
        color: "white",
      }}
      className="w-80 md:w-72 shadow-2xs"
    >
      <CardMedia
        component="img"
        className="h-35"
        image={thumbnail}
        alt={title}
      />
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={avatar} />
          </Grid>
          <Grid item>
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
