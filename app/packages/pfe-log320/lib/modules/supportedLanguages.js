export const SupportedLanguages = {
  csharp: {
    id: "csharp",
    name: "C# Mono 4.8",
    framework: "nunit",
    codeTemplate: [
      "public class Money",
      "{",
      "    public int money;",
      "",
      "    public Money()",
      "    {",
      "        this.money = 9;",
      "    }",
      "",
      "    public void AddMoney(int amount)",
      "    {",
      "        this.money += amount;",
      "    }",
      "}\n"
    ].join("\n"),
    fixtureTemplate: [
      "using NUnit.Framework;",
      "using System;",
      "[TestFixture]",
      "public class Test",
      "{",
      "    [Test]",
      "    public void RightAmountOfMoney()",
      "    {",
      "        var m = new Money();",
      "        m.AddMoney(91);",
      "        Assert.AreEqual(100, m.money);",
      "    }",
      "}\n"
    ].join("\n")
  },
  cpp: {
    id: "cpp",
    name: "C++ 14",
    framework: "igloo",
    codeTemplate: [
      "class Money",
      "{",
      "public:",
      "    Money() : _money(9) {}",
      "    virtual ~Money() {}",
      "    int getMoney() { return _money; }",
      "    ",
      "    void addMoney(int amount)",
      "    {",
      "        _money += amount;",
      "    }",
      "",
      "private:",
      "    int _money;",
      "};\n"
    ].join("\n"),
    fixtureTemplate: [
      "Describe(MoneyTest)",
      "{",
      "    It(shouldTotal100)",
      "    {",
      "        Money money;",
      "        money.addMoney(91);",
      "        Assert::That(money.getMoney(), Equals(100));",
      "    }",
      "};"
    ].join("\n")
  },
  python: {
    id: "python",
    name: "Python 2.7.6",
    framework: "cw",
    codeTemplate: [
      "class Money:",
      "    def __init__(self):",
      "        self.money = 9",
      "    ",
      "    def add_money(self, amount):",
      "        self.money += amount",
      ""
    ].join("\n"),
    fixtureTemplate: [
      "Test.describe('Money')",
      "",
      "money = Money()",
      "",
      "Test.it('Should total 100')",
      "",
      "money.add_money(91)",
      "Test.assert_equals(money.money, 100)",
      ""
    ].join("\n")
  },
  java: {
    id: "java",
    name: "Java 1.8",
    codeTemplate: `public class Program {
    public static void main(String[] args) {
        // Code goes here
    }
}
`,
    fixtureTemplate: ""
  }
};
