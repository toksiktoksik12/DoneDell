# Deal Types Update - Primary & Resell

## 🎯 Overview
تم إضافة ميزة تصنيف الصفقات إلى نوعين مع حساب الضرائب التلقائي للصفقات الأساسية.

## ✅ Features Added

### 1. Deal Types
- **Primary**: صفقات أساسية مع خصم ضريبة 14% تلقائياً
- **Resell**: صفقات إعادة بيع بدون خصم ضرائب

### 2. Add Deal Screen Updates
- إضافة حقل اختيار نوع الصفقة (Deal Type)
- إضافة حقل الربح الإجمالي (Gross Profit)
- معاينة الربح مع حساب الضريبة التلقائي
- تحديث التحقق من صحة البيانات

### 3. Reports Screen Updates
- إحصائيات منفصلة للصفقات الأساسية والإعادة بيع
- عرض الربح الإجمالي والصافي للصفقات الأساسية
- عرض إجمالي الضرائب المخصومة
- إجمالي الربح العام من جميع الصفقات

## 📁 Files Modified

### 1. AddDealScreen.js
```javascript
// إضافة أنواع الصفقات
const DEAL_TYPES = [
  { label: 'Primary', value: 'primary' },
  { label: 'Resell', value: 'resell' },
];

// إضافة حالات جديدة
const [dealType, setDealType] = useState('');
const [grossProfit, setGrossProfit] = useState('');
const [profitPreview, setProfitPreview] = useState(null);

// دالة حساب الربح
const calculateProfitPreview = () => {
  const profit = parseFloat(grossProfit);
  let preview = {
    grossProfit: profit,
    netProfit: profit,
    taxAmount: 0,
    taxRate: 0,
  };

  if (dealType === 'primary') {
    const taxRate = 0.14; // 14% tax
    const taxAmount = profit * taxRate;
    preview = {
      ...preview,
      taxAmount,
      taxRate,
      netProfit: profit - taxAmount,
    };
  }

  setProfitPreview(preview);
};
```

### 2. ReportsScreen.js
```javascript
// إضافة إحصائيات الربح
const stats = {
  // ... existing stats
  primaryDeals: {
    count: 0,
    totalGrossProfit: 0,
    totalNetProfit: 0,
    totalTax: 0,
  },
  resellDeals: {
    count: 0,
    totalProfit: 0,
  },
  totalProfit: 0,
};

// حساب الإحصائيات حسب نوع الصفقة
if (deal.profit) {
  if (deal.dealType === 'primary') {
    stats.primaryDeals.count += 1;
    stats.primaryDeals.totalGrossProfit += deal.profit.grossProfit || 0;
    stats.primaryDeals.totalNetProfit += deal.profit.netProfit || 0;
    stats.primaryDeals.totalTax += deal.profit.taxAmount || 0;
    stats.totalProfit += deal.profit.netProfit || 0;
  } else if (deal.dealType === 'resell') {
    stats.resellDeals.count += 1;
    stats.resellDeals.totalProfit += deal.profit.netProfit || 0;
    stats.totalProfit += deal.profit.netProfit || 0;
  }
}
```

## 🎨 UI Components Added

### 1. Deal Type Selector
```jsx
<View style={styles.inputContainer}>
  <Paragraph style={styles.label}>Deal Type *</Paragraph>
  <Surface style={styles.pickerContainer}>
    <RNPickerSelect
      onValueChange={setDealType}
      items={DEAL_TYPES}
      placeholder={{
        label: 'Select Deal Type...',
        value: null,
        color: '#666666',
      }}
      style={pickerSelectStyles}
      value={dealType}
      useNativeAndroidPickerStyle={false}
      Icon={() => <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />}
    />
  </Surface>
</View>
```

### 2. Profit Input Field
```jsx
<View style={styles.inputContainer}>
  <TextInput
    label={dealType === 'primary' ? 'Gross Profit (EGP) *' : 'Profit (EGP) *'}
    value={grossProfit}
    onChangeText={setGrossProfit}
    keyboardType="numeric"
    returnKeyType="done"
    onSubmitEditing={Keyboard.dismiss}
    mode="outlined"
    style={styles.textInput}
    placeholder={dealType === 'primary' ? 'Example: 500000 (before tax)' : 'Example: 500000'}
  />
</View>
```

### 3. Profit Preview Card
```jsx
{profitPreview && (
  <Card style={styles.previewCard}>
    <Card.Content>
      <Title style={styles.previewTitle}>Profit Preview</Title>
      <Divider style={styles.divider} />
      
      <View style={styles.profitRow}>
        <Paragraph style={styles.profitLabel}>Gross Profit:</Paragraph>
        <Paragraph style={styles.profitAmount}>
          {formatCurrency(profitPreview.grossProfit)}
        </Paragraph>
      </View>

      {profitPreview.taxAmount > 0 && (
        <>
          <View style={styles.profitRow}>
            <Paragraph style={styles.profitLabel}>Tax (14%):</Paragraph>
            <Paragraph style={styles.taxAmount}>
              -{formatCurrency(profitPreview.taxAmount)}
            </Paragraph>
          </View>
          <Divider style={styles.divider} />
        </>
      )}

      <View style={styles.totalRow}>
        <Paragraph style={styles.totalLabel}>Net Profit:</Paragraph>
        <Paragraph style={styles.totalAmount}>
          {formatCurrency(profitPreview.netProfit)}
        </Paragraph>
      </View>
    </Card.Content>
  </Card>
)}
```

### 4. Profit Statistics in Reports
```jsx
{/* Profit Statistics */}
<Card style={styles.profitCard}>
  <Card.Content>
    <Title style={styles.profitTitle}>Profit Statistics</Title>
    
    {/* Primary Deals */}
    {statistics.primaryDeals && statistics.primaryDeals.count > 0 && (
      <>
        <View style={styles.dealTypeHeader}>
          <Text style={styles.dealTypeTitle}>Primary Deals ({statistics.primaryDeals.count})</Text>
        </View>
        
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{formatCurrency(statistics.primaryDeals.totalGrossProfit || 0)}</Text>
            <Text style={styles.statLabel}>Gross Profit</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{formatCurrency(statistics.primaryDeals.totalTax || 0)}</Text>
            <Text style={styles.statLabel}>Total Tax (14%)</Text>
          </View>
        </View>

        <View style={styles.statRow}>
          <View style={styles.statItemFull}>
            <Text style={styles.statValueLarge}>{formatCurrency(statistics.primaryDeals.totalNetProfit || 0)}</Text>
            <Text style={styles.statLabel}>Net Profit (After Tax)</Text>
          </View>
        </View>
      </>
    )}

    {/* Resell Deals */}
    {statistics.resellDeals && statistics.resellDeals.count > 0 && (
      <>
        <Divider style={styles.divider} />
        <View style={styles.dealTypeHeader}>
          <Text style={styles.dealTypeTitle}>Resell Deals ({statistics.resellDeals.count})</Text>
        </View>
        
        <View style={styles.statRow}>
          <View style={styles.statItemFull}>
            <Text style={styles.statValueLarge}>{formatCurrency(statistics.resellDeals.totalProfit || 0)}</Text>
            <Text style={styles.statLabel}>Total Profit</Text>
          </View>
        </View>
      </>
    )}

    {/* Total Profit */}
    {statistics.totalProfit > 0 && (
      <>
        <Divider style={styles.divider} />
        <View style={styles.statRow}>
          <View style={styles.statItemFull}>
            <Text style={[styles.statValueLarge, styles.totalProfitValue]}>{formatCurrency(statistics.totalProfit || 0)}</Text>
            <Text style={styles.statLabel}>Total Net Profit</Text>
          </View>
        </View>
      </>
    )}
  </Card.Content>
</Card>
```

## 🔧 Data Structure Updates

### Deal Object Structure
```javascript
const deal = {
  // ... existing fields
  dealType: 'primary' | 'resell',
  profit: {
    grossProfit: number,
    netProfit: number,
    taxAmount: number,
    taxRate: number,
  },
};
```

### Statistics Object Structure
```javascript
const statistics = {
  // ... existing fields
  primaryDeals: {
    count: number,
    totalGrossProfit: number,
    totalNetProfit: number,
    totalTax: number,
  },
  resellDeals: {
    count: number,
    totalProfit: number,
  },
  totalProfit: number,
};
```

## 🎯 Business Logic

### Primary Deals
1. المستخدم يدخل الربح الإجمالي
2. التطبيق يحسب الضريبة (14%) تلقائياً
3. يعرض الربح الصافي بعد خصم الضريبة
4. يحفظ كلاً من الربح الإجمالي والصافي ومبلغ الضريبة

### Resell Deals
1. المستخدم يدخل الربح النهائي
2. لا يتم خصم أي ضرائب
3. الربح المدخل هو الربح النهائي
4. يحفظ الربح كما هو

### Reports Display
1. **Primary Deals**: يعرض الربح الإجمالي، الضريبة المخصومة، والربح الصافي
2. **Resell Deals**: يعرض إجمالي الربح
3. **Total**: يعرض إجمالي الربح الصافي من جميع الصفقات

## 🚀 How to Test

1. افتح التطبيق واذهب إلى Add Deal
2. اختر نوع الصفقة (Primary أو Resell)
3. أدخل الربح الإجمالي
4. لاحظ معاينة الربح مع حساب الضريبة (للصفقات الأساسية)
5. سجل الصفقة
6. اذهب إلى Reports لرؤية الإحصائيات الجديدة

## 📊 Expected Results

### Primary Deal Example
- Gross Profit: 500,000 EGP
- Tax (14%): 70,000 EGP
- Net Profit: 430,000 EGP

### Resell Deal Example
- Profit: 300,000 EGP
- Net Profit: 300,000 EGP

### Reports Display
- Primary Deals: 1 deal, 500,000 gross, 70,000 tax, 430,000 net
- Resell Deals: 1 deal, 300,000 profit
- Total Net Profit: 730,000 EGP

---

تم تطوير جميع الميزات المطلوبة بنجاح! 🎉