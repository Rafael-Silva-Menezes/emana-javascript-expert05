import { describe, test, expect, jest } from "@jest/globals";
import fs from "fs";
import FileHelper from "../../src/fileHelper.js";

describe("#FileHelper", () => {
  describe("#getFileStatus", () => {
    test("it should return files statuses in correct format", async () => {
      const statMock = {
        dev: 66306,
        mode: 33204,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: 8420735,
        size: 307513,
        blocks: 608,
        atimeMs: 1631361256768.739,
        mtimeMs: 1631361256608.7385,
        ctimeMs: 1631361256612.7388,
        birthtimeMs: 1631361256608.7385,
        atime: "2021-09-11T11:54:16.769Z",
        mtime: "2021-09-11T11:54:16.609Z",
        ctime: "2021-09-11T11:54:16.613Z",
        birthtime: "2021-09-11T11:54:16.609Z",
      };

      const mockUser = "rafael";
      process.env.USER = mockUser;
      const filename = "file.png";

      jest
        .spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename]);

      jest
        .spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock);

      const result = await FileHelper.getFilesStatus("/tmp");

      const expectedResult = [
        {
          size: "308 kB",
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename,
        },
      ];

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
      expect(result).toMatchObject(expectedResult);
    });
  });
});
