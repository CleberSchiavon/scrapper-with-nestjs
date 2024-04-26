import { UserConfig, RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-conventionalcommits",
  rules: {
    "type-max-length": [RuleConfigSeverity.Error, "always", 10],
    "type-case": [RuleConfigSeverity.Error, "always", "lower-case"],
    "type-empty": [RuleConfigSeverity.Error, "never"],
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "rc",
        "feat",
        "fix",
        "hotfix",
        "ci",
        "chore",
        "style",
        "docs",
        "perf",
        "refac",
        "revert",
        "test",
      ],
    ],

    "scope-max-length": [RuleConfigSeverity.Error, "always", 25],
    "scope-case": [
      RuleConfigSeverity.Error,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "scope-empty": [RuleConfigSeverity.Error, "never"],

    "subject-max-length": [RuleConfigSeverity.Error, "always", 100],
    "subject-case": [
      RuleConfigSeverity.Error,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "subject-empty": [RuleConfigSeverity.Error, "never"],
    "subject-full-stop": [RuleConfigSeverity.Error, "never", "."],

    "body-leading-blank": [RuleConfigSeverity.Warning, "always"],
    "body-max-line-length": [RuleConfigSeverity.Error, "always", 100],

    "footer-leading-blank": [RuleConfigSeverity.Warning, "always"],
    "footer-max-line-length": [RuleConfigSeverity.Error, "always", 100],
  },
  prompt: {
    questions: {
      type: {
        description: "Selecione o tipo de alteração que você está confirmando",
        enum: {
          rc: {
            description:
              "Uma release para produção, contem varias outras branchs",
            title: "Release",
            emoji: "🛠",
          },
          feat: {
            description: "Um novo recurso",
            title: "Features",
            emoji: "✨",
          },
          fix: {
            description: "Uma correção de bug",
            title: "Bug Fixes",
            emoji: "🐛",
          },
          hotfix: {
            description: "Uma correção de bug",
            title: "Bug Fixes",
            emoji: "🐛",
          },
          ci: {
            description:
              "Alterações em nossos arquivos e scripts de configuração de CI (exemplos: webpack, scripts, gitlab-ci, config, etc...)",
            title: "Continuous Integrations",
            emoji: "⚙️",
          },
          chore: {
            description:
              "Outras alterações que não modificam os arquivos src ou de teste",
            title: "Chores",
            emoji: "♻️",
          },
          style: {
            description:
              "Alterações que não afetam o significado do código (exemplos: espaço em branco, formatação, falta de vírgula etc...)",
            title: "Styles",
            emoji: "💎",
          },
          docs: {
            description: "Apenas a documentação muda",
            title: "Documentation",
            emoji: "📚",
          },
          perf: {
            description: "Uma mudança de código que melhora o desempenho",
            title: "Performance Improvements",
            emoji: "🚀",
          },
          refactor: {
            description:
              "Uma alteração de código que não corrige um bug nem adiciona um recurso",
            title: "Code Refactoring",
            emoji: "📦",
          },
          revert: {
            description: "Reverte um commit anterior",
            title: "Reverts",
            emoji: "🗑",
          },
          test: {
            description:
              "Adicionando testes ausentes ou corrigindo testes existentes",
            title: "Tests",
            emoji: "🚨",
          },
        },
      },
      scope: {
        description:
          "(scope) Qual é o escopo dessa alteração (exemplos: nome do componente, nome do arquivo, nome da feature, etc...)",
      },
      subject: {
        description:
          "(subject) Escreva uma descrição curta e imperativa da mudança",
      },
      body: {
        description: "(body) Forneça uma descrição mais longa da alteração",
      },
    },
  },
};

export default Configuration;
