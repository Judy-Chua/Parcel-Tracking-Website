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
    {   orderId : "#A1A2",
        senderName : "John Dela Cruz",
        receiverName : "Juan Perez",
        senderNum : 12345,
        receiverNum : 67890,
        itemDesc : ["Item1", "Item2"],
        itemNum : [3, 5],
        transDate : "18-10-2024",
        originBranch : "Hub 1",
        destBranch : "Hub 2",
        total : 1503.25,

        arrivalDate : "20-10-2024",
        updatedBy : "Hub 1",
        updates : [30001, 30002] },

    /* 2 */
    {   orderId : "#B1B2",
        senderName : "Juan Dela Cruz",
        receiverName : "Juanita",
        senderNum : 1256,
        receiverNum : 3478,
        itemDesc : ["Item12"],
        itemNum : [9],
        transDate : "17-10-2024",
        originBranch : "Hub 3",
        destBranch : "Hub 4",
        total : 1900,

        arrivalDate : "27-10-2024",
        updatedBy : "Hub 4",
        updates : [30003] },
];

const sampleUpdates = [
    /* 1 */
    {   updateId : 30001,
        status : "PENDING",
        statusDesc : "Waiting for further instructions",
        updateDate : "18-10-2024",
        updateTime : "07:18:39 AM" },

    /* 2 */
    {   updateId : 30002,
        status : "PROCESSING",
        statusDesc : "The items are currently viewed and checked",
        updateDate : "18-10-2024",
        updateTime : "12:18:39 PM" },

    /* 3 */
    {   updateId : 30003,
        status : "PENDING",
        statusDesc : "Waiting for further instructions",
        updateDate : "17-10-2024",
        updateTime : "09:30:00 PM" },
];

module.exports = { sampleUsers, sampleOrders, sampleUpdates };