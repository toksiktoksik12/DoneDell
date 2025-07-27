# General Statistics Update

## 🎯 التحديث المطلوب
تم تعديل قسم General Statistics في شاشة التقارير ليعرض إحصائيات الربح بدلاً من Total Sales.

## ✅ التغييرات المطبقة

### قبل التحديث:
```
General Statistics:
- Total Deals
- Total Sales (قيمة العقارات)
- Total Commission
```

### بعد التحديث:
```
General Statistics:
- Total Deals (عدد الصفقات)
- Total Profit (إجمالي الربح)
- Total Tax (إجمالي الضرائب)
- Net Profit (الربح الصافي)
- Total Commission (إجمالي الكوميشن)
```

## 📊 التفاصيل

### 1. Total Profit
- يشمل الربح الإجمالي من جميع الصفقات
- Primary Deals: الربح الإجمالي قبل الضريبة
- Resell Deals: الربح النهائي (لا توجد ضرائب)

### 2. Total Tax
- إجمالي الضرائب المخصومة من الصفقات الأساسية فقط
- 14% من الربح الإجمالي للصفقات الأساسية
- صفقات Resell لا تتضمن ضرائب

### 3. Net Profit
- الربح الصافي بعد خصم الضرائب
- Primary Deals: الربح الإجمالي - الضريبة
- Resell Deals: الربح كما هو
- المجموع النهائي للربح الصافي

## 🔧 التعديلات التقنية

### في calculateStatistics():
```javascript
const stats = {
  // ... existing fields
  totalGrossProfit: 0, // إجمالي الربح الإجمالي
  totalTax: 0, // إجمالي الضرائب
};

// حساب الإحصائيات
if (deal.dealType === 'primary') {
  stats.totalGrossProfit += deal.profit.grossProfit || 0;
  stats.totalTax += deal.profit.taxAmount || 0;
} else if (deal.dealType === 'resell') {
  stats.totalGrossProfit += deal.profit.netProfit || 0; // في Resell الربح الإجمالي = الربح الصافي
}
```

### في واجهة المستخدم:
```jsx
<View style={styles.statRow}>
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{formatNumber(statistics.totalDeals || 0)}</Text>
    <Text style={styles.statLabel}>Total Deals</Text>
  </View>
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{formatCurrency(statistics.totalGrossProfit || 0)}</Text>
    <Text style={styles.statLabel}>Total Profit</Text>
  </View>
</View>

<View style={styles.statRow}>
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{formatCurrency(statistics.totalTax || 0)}</Text>
    <Text style={styles.statLabel}>Total Tax</Text>
  </View>
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{formatCurrency(statistics.totalProfit || 0)}</Text>
    <Text style={styles.statLabel}>Net Profit</Text>
  </View>
</View>
```

## 📈 مثال عملي

### الصفقات:
1. **Primary Deal**: ربح إجمالي 500,000 جنيه
   - الضريبة: 70,000 جنيه (14%)
   - الربح الصافي: 430,000 جنيه

2. **Resell Deal**: ربح 300,000 جنيه
   - لا توجد ضرائب
   - الربح الصافي: 300,000 جنيه

### النتيجة في General Statistics:
- **Total Deals**: 2
- **Total Profit**: 800,000 جنيه (500,000 + 300,000)
- **Total Tax**: 70,000 جنيه
- **Net Profit**: 730,000 جنيه (430,000 + 300,000)
- **Total Commission**: [حسب نظام الكوميشن]

## ✅ الفوائد

1. **وضوح أكبر**: عرض إحصائيات الربح مباشرة
2. **شمولية**: يشمل جميع أنواع الصفقات
3. **تفصيل**: عرض الضرائب والربح الصافي منفصلين
4. **سهولة المتابعة**: معرفة إجمالي الضرائب المستحقة

---

**تم التحديث بنجاح! ✅**