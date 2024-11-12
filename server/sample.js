const sampleUsers = [
    /* 1 */
    { employeeId: 10001,
      password: "hello",
      hubName: "Hub 1" },

    /* 2 */
    { employeeId: 10002,
        password: "sample",
        hubName: "Hub 2" },

    /* 3 */
    { employeeId: 10003,
        password: "pass",
        hubName: "Hub 3" },

    /* 4 */
    { employeeId: 10004,
        password: "four",
        hubName: "Hub 4" },
];

const sampleOrders = [
    /* 1 */
    {   orderId : "FRI12345",
        senderName : "John Dela Cruz",
        receiverName : "Juan Perez",
        senderNum : 12345,
        receiverNum : 67890,
        itemDesc : ["Item1", "Item2"],
        itemNum : [3, 5],
        itemPrice : [123, 456],
        transDate : "10-18-2024",
        originBranch : "Hub 1",
        destBranch : "Hub 2",
        initialCharge : 579,
        discount : 123,
        total : 456,

        status : "IN TRANSIT",
        arrivalDate : "10-20-2024",
        updatedBy : "Hub 1",
        updates : [30002, 30003] },

    /* 2 */
    {   orderId : "THU11111",
        senderName : "Juan Dela Cruz",
        receiverName : "Juanita",
        senderNum : 1256,
        receiverNum : 3478,
        itemDesc : ["Item12"],
        itemNum : [9],
        itemPrice : [2000],
        transDate : "10-17-2024",
        originBranch : "Hub 3",
        destBranch : "Hub 4",
        initialCharge : 2000,
        discount : 100,
        total : 1900,

        status : "PROCESSING",
        arrivalDate : "10-27-2024",
        updatedBy : "Hub 4",
        updates : [30001] },
];

const sampleUpdates = [
    /* 1 */
    {   updateId : 30001,
        status : "PROCESSING",
        statusDesc : "Waiting for further instructions",
        updateDate : "10-17-2024",
        updateTime : "09:30:00 PM" },


    /* 2 */
    {   updateId : 30002,
        status : "PROCESSING",
        statusDesc : "Waiting for further instructions",
        updateDate : "10-18-2024",
        updateTime : "07:18:39 AM" },    

    /* 3 */
    {   updateId : 30003,
        status : "IN TRANSIT",
        statusDesc : "The items are currently viewed and checked",
        updateDate : "10-18-2024",
        updateTime : "12:18:39 PM" },
];

module.exports = { sampleUsers, sampleOrders, sampleUpdates };