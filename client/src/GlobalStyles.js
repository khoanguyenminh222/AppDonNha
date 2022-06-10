import { StyleSheet, Platform } from 'react-native';
import { COLORS } from './Colors';
export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
});