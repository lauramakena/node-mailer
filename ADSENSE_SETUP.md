# Google AdSense Setup Guide

## 🎯 AdSense Integration Complete!

Your Node Mailer application now has Google AdSense integrated with strategic ad placements. Here's everything you need to know to get your ads running.

## 📋 Setup Steps

### 1. Get Your AdSense Account
1. Go to [adsense.google.com](https://adsense.google.com)
2. Sign up for an AdSense account
3. Verify your website (`https://node-mailer-owuv.onrender.com` or your domain)
4. Get your **Publisher ID** (starts with `ca-pub-`)

### 2. Create Ad Units
In your AdSense dashboard, create these ad units:

#### Header Banner Ad
- **Name**: Header Banner
- **Size**: 728x90 (Leaderboard) or Responsive
- **Type**: Display ads
- **Note the Ad Slot ID** (numbers only)

#### Sidebar Ad
- **Name**: Sidebar Rectangle
- **Size**: 300x250 (Medium Rectangle) or Auto-sized
- **Type**: Display ads
- **Note the Ad Slot ID**

#### Footer Banner Ad
- **Name**: Footer Banner
- **Size**: 728x90 (Leaderboard) or Responsive
- **Type**: Display ads
- **Note the Ad Slot ID**

### 3. Configure Environment Variables

Create a `.env` file in your project root with:

```bash
# Google AdSense Configuration
REACT_APP_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXXXX
REACT_APP_ADSENSE_HEADER_SLOT=1234567890
REACT_APP_ADSENSE_SIDEBAR_SLOT=0987654321
REACT_APP_ADSENSE_FOOTER_SLOT=1122334455
```

### 4. Update HTML Script
Replace the placeholder publisher ID in `client/public/index.html`:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ACTUAL_PUBLISHER_ID" crossorigin="anonymous"></script>
```

## 📍 Ad Placements

Your app now has **3 strategic ad placements**:

1. **Header Banner** - Top of the page, high visibility
2. **Sidebar Ad** - Right side, sticky positioning
3. **Footer Banner** - Bottom of the page

## 🎨 Ad Styling

The ads are styled to match your app's design:
- Clean white backgrounds
- Subtle borders and shadows
- "Advertisement" labels for transparency
- Responsive design for mobile devices

## 🚀 Deployment

After configuration:

1. **Test locally** with placeholder values
2. **Deploy to production**
3. **Submit for AdSense approval** if first time
4. **Monitor performance** in AdSense dashboard

## 📊 Best Practices

- **Don't click your own ads** (violates AdSense policy)
- **Ensure ads don't interfere** with user experience
- **Monitor ad performance** regularly
- **Comply with AdSense policies**

## 🔧 Troubleshooting

### Ads Not Showing?
1. Check browser console for errors
2. Verify environment variables are loaded
3. Ensure AdSense account is approved
4. Check if ad slots are correct

### AdSense Policy Issues?
- Review [AdSense policies](https://support.google.com/adsense/answer/48182)
- Make sure content complies with guidelines
- Avoid prohibited content types

## 💰 Monetization Tips

- **Optimize ad placements** based on user engagement
- **Use responsive ads** for better mobile performance
- **A/B test different ad sizes** and positions
- **Monitor revenue** and adjust strategy accordingly

## 📞 Support

- **AdSense Help Center**: [support.google.com/adsense](https://support.google.com/adsense)
- **AdSense Forum**: Community support
- **Policy Center**: Check specific policies

---

**🎉 Your AdSense integration is ready! Just replace the placeholder values with your actual AdSense IDs and start earning revenue from your Node Mailer app.**
