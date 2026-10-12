# 01: 返回時保留使用者的閱讀位置

What to build: 返回目標存在時恢復閱讀位置；目標不存在時保留畫面及歷史，提示缺少的路徑。來源為 [reader:N1@1](navigation.md#navigation-contract)。

這是一份合成的追蹤紀錄，不是實際測試或審查證據，也不作為完整可發布工單的範本。

## Current state

Execution: 示例程式已實作，尚未整合。
Verification: 示例中的本機測試通過；NOT INDEPENDENTLY VERIFIED。
As of: 合成 revision example-1，非真實提交。
Remaining: 獨立審查、整合測試和缺少目標的實機驗證；尚不能稱為交付完成。

## Reading this state

| 主張 | 此示例能支持什麼 | 不能推論什麼 |
| --- | --- | --- |
| 已實作 | 有一個待驗證的實作結果 | 已整合或可發布 |
| 本機測試通過 | 示例中的本機條件通過 | 其他環境和實機流程也通過 |
| 獨立審查未完成 | 仍有明確的驗證缺口 | 沒有 blocker 就等於審查 PASS |

此處不使用「完成 80%」的圓餅圖：實作、測試、審查和發佈義務沒有共同的完成度分母。

## Comments

歷史事件保留在此；新發現的缺口需先更新上方 Current state，不能只在這裡追加。若它改變需求而尚未獲授權，將差異列為待決定，不暗中改寫來源。
