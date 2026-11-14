/**
 * Чёрный экран вместо циферблата: ничего, кроме одной кнопки, которая открывает приложение «Таймер» (U613).
 * Новые кнопки для будущих приложений добавляются в список APPS ниже (appId из app.json нужного приложения).
 * ЭКСПЕРИМЕНТ: Zepp не гарантирует запуск чужих приложений с циферблата — проверяется на часах.
 */
import { createWidget, widget, align } from '@zos/ui'
import { getDeviceInfo } from '@zos/device'
import { launchApp } from '@zos/router'

const APPS = [
  { appId: 1061361, label: '⏱' }   // Таймер (U613)
]

WatchFace({
  build() {
    let w = 432
    let h = 514
    try { const d = getDeviceInfo(); if (d && d.width > 0 && d.height > 0) { w = d.width; h = d.height } } catch (e) { /* по умолчанию */ }

    createWidget(widget.FILL_RECT, { x: 0, y: 0, w: w, h: h, color: 0x000000 })

    const size = Math.round(w * 0.42)
    const gap = Math.round(w * 0.06)
    const total = APPS.length * size + (APPS.length - 1) * gap
    // кнопки в ряд по центру экрана (пока одна)
    for (let k = 0; k < APPS.length; k++) {
      const app = APPS[k]
      createWidget(widget.BUTTON, {
        x: Math.round((w - total) / 2) + k * (size + gap),
        y: Math.round((h - size) / 2),
        w: size, h: size,
        text: app.label, text_size: Math.round(size * 0.5), color: 0xffffff,
        normal_color: 0x202024, press_color: 0x3a3a42, radius: Math.round(size * 0.2),
        click_func: () => {
          try { launchApp({ appId: app.appId, native: false }) } catch (e) { /* не получилось — открыть приложение из списка */ }
        }
      })
    }
  }
})
