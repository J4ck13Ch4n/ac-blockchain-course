// run.ts (Node.js + ts-node version)
// Chạy bài học theo tên bài (ví dụ: bai1_1)
// Cách dùng: npx ts-node run.ts bai1_1

declare const __dirname: string;
declare const process: {
    argv: string[];
    exit(code?: number): never;
};
declare function require(moduleName: string): unknown;

const path = require("path") as {
    resolve: (...paths: string[]) => string;
};

const args = process.argv.slice(2);
if (args.length === 0) {
    console.log("❗ Vui lòng truyền tên bài học. Ví dụ:");
    console.log("   npx ts-node run.ts bai1_1");
    process.exit(1);
}

const lesson = args[0];
const lessonPath = path.resolve(__dirname, "lessons", lesson, "test.ts");

Promise.resolve()
    .then(() => require(lessonPath))
    .then(() => {
        console.log(`✅ Đã chạy xong bài: ${lesson}`);
    })
    .catch((err) => {
        console.error(`❌ Không tìm thấy hoặc lỗi khi chạy ${lessonPath}`);
        console.error(err.message);
    });