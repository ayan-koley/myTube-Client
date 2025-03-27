import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {formatViews, formatTime, truncatTitle} from '../Utils/utilsFunc'
import UserAvatar from "./UserAvatar";

function VideoCard({ thumbnail, username, avatar, title, createdAt, views, className }) {

  const formattedViews = formatViews(views);
  const formattedTime = formatTime(createdAt);
  const truncatedTitle = truncatTitle(title)

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: '2px 5px 15px rgba(255, 255, 255, 0.5);',
        backgroundColor: "#1e1e1e",
        color: "white",
      }}
      className={`w-80 md:w-70 sm-2:w-90 lg-2:w-80 hover:scale-102 transition-all duration-1000 !${className}`}
    >
      <CardMedia
        component="img"
        className="h-35"
        image={thumbnail}
        alt={title}
      />
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid >
            {/* <Avatar src={avatar} /> */}
            <UserAvatar username={username} src={avatar} />
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
