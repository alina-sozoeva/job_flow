// app.get("/test", async (_req, res) => {
//   try {
//     const a = await Promise.resolve(5);
//     console.log("Step 1:", a);
//     const b = a + 2;
//     console.log("Step 2:", b);
//     if (b % 2 === 0) throw "errA";
//     const c = b * 3;
//     console.log("Step 3:", c);
//     const resultFromTest = c - 4;

//     console.log("Step 4:", resultFromTest);

//     if (resultFromTest > 40) throw "errB";

//     console.log("Step 5:", resultFromTest * 2);

//     res.json({ message: "done", result: resultFromTest * 2 });
//   } catch (err) {
//     console.log("Catch", err);
//     res.json({ message: "error", result: err });
//   }
// });
