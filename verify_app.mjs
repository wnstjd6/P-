import { chromium } from 'playwright';
import { join } from 'path';
import { mkdirSync } from 'fs';
const DIR = 'c:\\Users\\Mirim\\Pro\\screenshots';
mkdirSync(DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

// 모바일로 아코디언 + 폼 확인
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 15000 });

// 첫 번째 카드 맛보기 클릭
await page.locator('button:has-text("맛보기")').first().click();
await page.waitForTimeout(400);
await page.screenshot({ path: join(DIR, '01_mobile_open.png') });

// 비유 저장
await page.locator('input[type="text"]').fill('LTV는 내 지갑 한도액!');
await page.locator('button:has-text("저장")').click();
await page.waitForTimeout(300);

// 냉장고 확인
await page.locator('#fridge-section').scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.screenshot({ path: join(DIR, '02_fridge_mobile.png') });

// 냉장고 수정 버튼 클릭
const editBtn = page.locator('#fridge-section button[title="수정"]').first();
await editBtn.click();
await page.waitForTimeout(200);
await page.screenshot({ path: join(DIR, '03_fridge_edit.png') });

// 데스크탑 아코디언
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 10000 });
await page.locator('button:has-text("맛보기")').first().click();
await page.waitForTimeout(400);
await page.screenshot({ path: join(DIR, '04_desktop_open.png') });

await browser.close();
console.log('done');
