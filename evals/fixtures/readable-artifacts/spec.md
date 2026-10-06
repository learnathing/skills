# 推荐查询：首次超时后重试一次，再次超时后返回降级结果

这是从仓库 E6 决策用例制作的写作与解析测试样本，不是实际服务的执行记录。`206` 来自该用例，并非通用接口设计建议。

## Problem Statement

推荐查询需要按已约定的规则处理网关超时，不能把所有异常都改成成功响应。

## Outcome

调用方能区分正常查询与连续超时后的降级结果。正常结果不变，超时后的查询次数有明确上限。

## Scenarios

**S1：保持现有行为**

网关首次查询成功时，接口返回状态码 200，并原样返回网关列表。

**S2：新增行为**

首次查询超时、重试成功时，接口只重试一次，返回 200 和重试所得列表。记录一次 gatewayTimeout()。

**S3：新增行为**

连续两次查询超时时，接口返回 206 和空列表。记录两次 gatewayTimeout() 和一次 degradedResponse()；不再查询。

## Out of Scope

不增加缓存，不发起第三次查询，不吞掉非超时异常。本次不授权发布或修改生产数据。

## Invariants

I1：保留 `SuggestionService(RiskGateway)` 和 `SuggestionController(SuggestionService, SuggestionMetrics)` 两个构造函数，以及公开接口的兼容性（D0、D1）。I2：网关查询使用请求中的 customerId，返回时不修改网关列表内容（D2）。

## Interface and Failure Contract

调用方通过 `SuggestionController.suggestions(String customerId)` 取得 `HttpResponse<List<String>>`。调用 `RiskGateway.fetchSuggestions` 时传入原请求中的 customerId。正常与超时结果见 S1 至 S3。非超时异常不得被吞掉或替换为降级结果。

## Verification

这些检查是待执行要求，不是成功证据。S1 检查返回列表保持不变；S2 检查重试次数及一次超时记录；S3 检查 206、空列表、两次超时记录和一次降级记录，同时检查没有额外重试。

## Source Index

| ID | 约定 | 来源 |
| --- | --- | --- |
| D0 | 保留 SuggestionService(RiskGateway) 和 SuggestionController(SuggestionService, SuggestionMetrics) | E6 的 D0 |
| D1 | 使用上述公开查询接口 | E6 的 D1 |
| D2 | fetchSuggestions 使用原请求中的 customerId；成功时返回 200 和原始列表 | E6 的 D2 |
| D3 | 首次超时记录一次 gatewayTimeout()，并只重试一次 | E6 的 D3 |
| D4 | 重试再次超时后返回 206 和空列表，再记一次 gatewayTimeout() 和一次 degradedResponse() | E6 的 D4 |
| D5 | 不增加缓存、额外重试或吞掉非超时异常 | E6 的 D5 |

原始来源：`evals/fixtures/e6-required-fallback.md`，基线为 `cf935302dca2adba1a37003923f8ddeb20fa517c`。生产动作仍需独立授权，此样本不改变原始用例。

## Delivery Manifest

```json
{
  "schema_version": 1,
  "delivery_ids": [
    {
      "id": "S1",
      "definition": "网关首次查询成功时，接口返回状态码 200，并原样返回网关列表。",
      "source_ids": [
        "D0",
        "D1",
        "D2"
      ]
    },
    {
      "id": "S2",
      "definition": "首次查询超时、重试成功时，接口只重试一次，返回 200 和重试所得列表。记录一次 gatewayTimeout()。",
      "source_ids": [
        "D1",
        "D2",
        "D3"
      ]
    },
    {
      "id": "S3",
      "definition": "连续两次查询超时时，接口返回 206 和空列表。记录两次 gatewayTimeout() 和一次 degradedResponse()；不再查询。",
      "source_ids": [
        "D1",
        "D3",
        "D4",
        "D5"
      ]
    }
  ],
  "technical_constraints": [
    {
      "id": "suggestions:C1",
      "revision": "1",
      "definition": "本次不增加缓存、额外重试或吞掉非超时异常。",
      "source": "evals/fixtures/readable-artifacts/spec.md#source-index",
      "applies_to": [
        "S1",
        "S2",
        "S3"
      ],
      "verified_by": "S3"
    }
  ]
}
```
