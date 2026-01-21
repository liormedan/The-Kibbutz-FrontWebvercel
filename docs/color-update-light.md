# עדכון צבעים — מצב בהיר (Light Mode) — מסמך שינוי לאישור

מקור הצבעים החדשים: תיקיית העיצובים `colors\The Kibbutz Page light and dark` (PNG).

## 1) פלטת צבעים שזוהתה מהקבצים (HEX)

הערה: לאחר שביקשת דיוק מוחלט, החילוץ בוצע מחדש כ־**Exact pixel extraction** (ללא קוונטיזציה). הדוח המלא: `docs/exact-light-palette-report.md`.

- **רקע “לבן בהיר” כללי**: `#FBF1F1` (חוזר במסכי הצ׳אט/תפריט)
- **לבן מלא/כרטיסים** (המעצב משתמש בכמה לבנים קרובים מאוד):
  - `#FFFFFF`
  - `#FFFEFE` (נפוץ מאוד ב־Setting/Friends)
  - `#FEFBFB` (נפוץ ב־Menu)
- **אפור בהיר מאוד / משטחים**:
  - `#F0F0F0`
  - `#F9F9F9`
  - `#E8E8E8`
- **אפור טקסט/אייקונים**:
  - `#858585` (מסכי Setting/Friends)
  - `#818181` (תיקי עבודות)
- **טורקיז (CTA / כותרות / דגשים)**:
  - `#38D8DF` (צ׳אטים/הגדרות/חברים)
  - `#30C2C9` (תיקי עבודות)
- **צהוב**: `#F5C82C`
- **כתום**: `#F26331`
- **ליים**: `#B5D334`
- **טקסט כהה**:
  - `#222222` / `#232323` / `#242422` (תיקי עבודות)

## 2) מיפוי לקוד הקיים — איפה היום מוגדרים צבעי Light

צבעי ה־Light mode מוגדרים ב־`src/app/globals.css` כ־CSS Variables:

- `--color-background` (כיום `#fbf1f1`)
- `--color-foreground` (כיום `#6a6f7d`)
- `--accent-9`, `--accent-10`, `--accent-11`, `--accent-a9` (כיום אפור/רקע)
- `--secondary` (כיום `#f1dab0`)
- `--gray-surface` (כיום `#bedce4`)
- `--gray-1` (כיום `#fbf1f1`)

בנוסף יש שימושים נקודתיים בצבעים/טוקנים בקומפוננטים:
- `src/components/AppLayout.tsx`: header bg `var(--color-background)`, רקע עמוד `var(--gray-1)`, לוגו `var(--accent-9)`
- `src/components/MainMenuRight.tsx`: פריט פעיל משתמש `var(--accent-11)` / `var(--accent-3)` + רקע אייקון `white`/`var(--gray-3)`
- `src/app/chat/page.tsx`: בועת “me” משתמשת `var(--accent-9)`; בועת “other” היא `white`; רקעים `var(--gray-1)`/`var(--gray-2)`
- `src/app/login/page.tsx`: רקע `var(--gray-2)`; קישורים/לוגו `var(--accent-9)`
- `src/app/notifications/page.tsx`: נקודה לא־נקראה `var(--accent-9)`; כרטיס לא־נקרא `var(--accent-2)`

## 3) שינוי מוצע (Light בלבד) — Old → New

### טוקנים גלובליים (ב־`globals.css`)

הצעה (מבוסס על החילוץ המדויק מה־PNGs):

- **`--color-background`**: `#fbf1f1` → `#FBF1F1`  (רקע מדויק)
- **`--gray-1`**: `#fbf1f1` → `#FBF1F1` (יישור עם הרקע הכללי)
- **`--gray-surface`**: `#bedce4` → `#F0F0F0` (משטח ניטרלי בהיר שמופיע שוב ושוב)
- **`--color-foreground`**: `#6a6f7d` → `#222222` (טקסט כהה מדויק שמופיע בתיקי עבודות)
- **`--accent-9` (Primary / Brand / CTA)**: `#6a6f7d` → `#38D8DF` (טורקיז מדויק)
- **`--accent-10` (Hover/Strong)**: `#5a5f6b` → `#30C2C9` (ווריאנט טורקיז נוסף שמופיע בעיצובים)
- **`--accent-11` (Text on accent)**: `#fbf1f1` → `#FFFFFF` (לבן מלא על CTA)
- **`--secondary`**: `#f1dab0` → `#F5C82C` (צהוב מדויק – אם זה אכן “secondary”)

### צבעים פונקציונליים (לא חובה לשלב בשלב זה)

ה־PNGs מציגים גם:
- **Orange**: `#F46434`
- **Lime**: `#B4D434`

אם הם מיועדים לסטטוסים/תגים/קטגוריות, נוכל להוסיף טוקנים חדשים (למשל `--status-warning`, `--status-success`) במקום להלביש אותם על `--secondary`.

## 4) נקודות לאישור לפני שמבצעים בקוד

כדי לסגור את מסמך השינוי ולעבור לביצוע, צריך ממך 2 החלטות קצרות:

1) **”לבן” קנוני לטוקנים**: לבחור האם לנעול על `#FFFFFF` בלבד, או לשמר את הניואנסים (`#FFFEFE` / `#FEFBFB`) כפי שמופיעים בקבצים.
2) **מה המשמעות של “צהוב/כתום/ליים”** אצלכם:
   - האם זה “secondary” כללי של המותג?
   - או צבעי סטטוס/תגים (ואז עדיף להגדיר טוקנים ייעודיים)?


