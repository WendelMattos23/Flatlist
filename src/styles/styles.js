import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fd34',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginTop: 50,
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        width: '80%',
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    list: {
        marginTop: 32,
        width: '80%',
    },
    itemList: {
        padding: 24,
        borderRadius: 7,
        backgroundColor: '#FFF',
        marginBottom: 16,
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    }
});
