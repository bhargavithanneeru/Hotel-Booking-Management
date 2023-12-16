import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const Chart = ({ aspect, title }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date();
        const sixMonthsAgo = new Date(currentDate);
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        // Replace with your actual logic to fetch users created in the last 6 months
        const response = await axios.get("/users",{withCredentials:true} );

        const filteredData = response.data.filter((user) => {
          const userCreatedAt = new Date(user.createdAt);
          return userCreatedAt >= sixMonthsAgo && userCreatedAt <= currentDate;
        });

        const groupedData = groupByMonth(filteredData);

        setData(groupedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs once on mount

  const groupByMonth = (users) => {
    const monthCounts = users.reduce((result, user) => {
      const userCreatedAt = new Date(user.createdAt);
      const month = userCreatedAt.toLocaleString("default", { month: "long" });
  
      if (!result[month]) {
        result[month] = 1;
      } else {
        result[month]++;
      }
  
      return result;
    }, {});

    const allMonths = Array.from({ length: 6 }, (_, index) => {
      const date = new Date();
      date.setMonth(date.getMonth() - index);
      return date.toLocaleString("default", { month: "long" });
    }).reverse();;
  
    const groupedData = allMonths.map((month) => ({
      name: month,
      Total: monthCounts[month] || 0,
    }));
  
    return groupedData;
  };
  

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

















// import "./chart.scss";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { Link, useLocation } from "react-router-dom";
// import useFetch from "../../hooks/useFetch"
// import { useEffect, useState } from "react";
// import axios from "axios";

// const Chart = ({ aspect, title }) => {
//   const location = useLocation()
//   const path = location.pathname.split("/")[1]
//   const[list, setList]= useState()
//   const {data, loading, error} = useFetch("/users")


//   useEffect(()=>{
//     console.log("Data from useFetch:", data);
//     setList(data)
//     console.log("List from useFetch:", list);
//   },[data])
//   return (
//     <div className="chart">
//       <div className="title">{title}</div>
//       <ResponsiveContainer width="100%" aspect={aspect}>
//         <AreaChart
//           width={730}
//           height={250}
//           data={data}
//           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//         >
//           <defs>
//             <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//             </linearGradient>
//           </defs>
//           <XAxis dataKey="name" stroke="gray" />
//           <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
//           <Tooltip />
//           <Area
//             type="monotone"
//             dataKey="Total"
//             stroke="#8884d8"
//             fillOpacity={1}
//             fill="url(#total)"
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default Chart;
