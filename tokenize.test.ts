import { test } from "tap";
import { tokenize } from "./tokenize";

test("parser", (t) => {
  t.same(tokenize("0 HEAD"), { level: 0, tag: "HEAD" });

  t.same(tokenize("  \t 1 NAME Will /Rogers/"), {
    level: 1,
    tag: "NAME",
    value: "Will /Rogers/",
  });

  t.same(tokenize("  \t 1 SOUR SPACE AFTER "), {
    level: 1,
    tag: "SOUR",
    value: "SPACE AFTER ",
  });

  t.same(tokenize("1 _USER_DEFINED_TAG X"), {
    level: 1,
    tag: "_USER_DEFINED_TAG",
    value: "X",
  });

  t.same(tokenize("0 @I1@ INDI"), {
    level: 0,
    xref_id: "@I1@",
    tag: "INDI",
  });

  t.same(tokenize("1 CHIL @1234@"), {
    level: 1,
    tag: "CHIL",
    pointer: "@1234@",
  });

  t.end();
});
