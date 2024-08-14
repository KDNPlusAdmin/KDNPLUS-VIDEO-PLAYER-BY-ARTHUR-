# Set temporary execution policy to bypass restrictions
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

# Install necessary packages for React Navigation
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

# (Optional) Update all npm packages to their latest versions
npm update
