#!/bin/bash
# OAuth Validation Script for sararin.ai

echo "🔍 Validating sararin.ai OAuth Setup..."
echo "========================================"
echo ""

echo "✅ Step 1: Homepage"
curl -s -o /dev/null -w "Status: %{http_code}\n" https://sararin.ai

echo ""
echo "✅ Step 2: Middleware redirect"
curl -s -I https://sararin.ai/internal/dashboard | grep -i "location"

echo ""
echo "✅ Step 3: Sign-in page loads"
curl -s -o /dev/null -w "Status: %{http_code}\n" https://sararin.ai/auth/signin

echo ""
echo "✅ Step 4: Name correct"
curl -s https://sararin.ai | grep -o "Sararin Malaithong" | head -1

echo ""
echo "🔐 Step 5: OAuth API (CRITICAL)"
CSRF=$(curl -s https://sararin.ai/api/auth/csrf)
if echo "$CSRF" | grep -q "csrfToken"; then
  echo "✅ OAuth configured correctly!"
  echo "$CSRF" | python3 -m json.tool | head -5
else
  echo "❌ OAuth configuration error:"
  echo "$CSRF"
fi

echo ""
echo "🎯 Step 6: Providers endpoint"
PROVIDERS=$(curl -s https://sararin.ai/api/auth/providers)
if echo "$PROVIDERS" | grep -q "google"; then
  echo "✅ Google provider registered!"
else
  echo "⚠️  Check providers:"
  echo "$PROVIDERS"
fi

echo ""
echo "========================================"
echo "⏰ Waiting 2 minutes for deployment..."
echo "========================================"
