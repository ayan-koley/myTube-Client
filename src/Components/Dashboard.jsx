import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Dashboard = ({ title, value, icon, color }) => {
  return (
    <Card className="shadow-lg rounded-2xl">
      <CardContent className="flex items-center space-x-4 p-6 bg-[#333] text-white">
        <div className={`p-4 rounded-full text-white ${color}`}>{icon}</div>
        <div>
          <Typography variant="h6" className="font-semibold">
            {title}
          </Typography>
          <Typography variant="h4" className="font-bold">
            {value.toLocaleString()}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
