export const jobsApi = {
    total: "6575",
    data: [
        {
            status: "incomplete",
            percent: "10",
            value: "$11",
            amount_due: [0, 1, 2, 3, 5],
            color: "red",
        },
        {
            status: "completed",
            percent: "9",
            value: "$11",
            amount_due: [0, 1, 2, 3, 5],
            color: "black",
        },
    ],
};


// const configRef = useRef(null);
    // useEffect(() => {
    //   var temp  = {
    //     status :[], 
    //     percent : [], 
    //     color: []
    //   }
    //   jobsData.forEach(item => {
    //     temp.status.push(item.status);
    //     temp.percent.push(item.percent);
    //     temp.color.push(item.color);
    //   });
    //   configRef.current = temp;
    // },[])

    // console.log('configRef', configRef)