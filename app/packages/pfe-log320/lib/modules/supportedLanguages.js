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
      "}\n",
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
      "}\n",
    ].join("\n"),
  },
  cpp: {
    id: "cpp",
    name: "C++ 14",
    framework: "igloo",
    codeTemplate: [
      "class Exercice",
      "{",
      "public:",
      "    Exercice() : {}",
      "    virtual ~Exercice() {}",
      "    ",
      "    std::vector<int> fibonacci(int n0, int n1, int count)",
      "    {",
      "    ",
      "    }",
      "",
      "};\n",
    ].join("\n"),
    fixtureTemplate: [
      "Describe(Fibonacci)",
      "{",
      "    It(LesDixPremiersNombre)",
      "    {",
      "        Exercice ex;",
      "        std::vector<int> vector = {0, 1, 1, 2, 3, 5, 8, 13, 21, 34};",
      "        Assert::That(ex.fibonacci(0, 1, 10), Equals(vector));",
      "    }",
      "};",
    ].join("\n"),
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
      "",
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
      "",
    ].join("\n"),
  },
  java: {
    id: "java",
    name: "Java 1.8",
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
      "    public void addMoney(int amount)",
      "    {",
      "        this.money += amount;",
      "    }",
      "}\n",
    ].join("\n"),
    fixtureTemplate: [
      "import org.junit.Test;",
      "import static org.junit.Assert.assertEquals;",
      "import org.junit.runners.JUnit4;",
      "",
      "public class MoneyTest {",
      "    @Test",
      "    public void testShouldEqual100() {",
      "        Money money = new Money();",
      "        money.addMoney(91);",
      "        assertEquals(money.money, 100);",
      "    }",
      "}\n",
    ].join("\n"),
  },
};
