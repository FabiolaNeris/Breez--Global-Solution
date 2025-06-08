import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

type Props = {
    id: string;
    nomeLocal: string;
    tipoLocal: string;
    referencia: string;
    onEditar: () => void;
    onExcluir: () => void;
};

export default function ItemRota({ id, nomeLocal, tipoLocal, referencia, onEditar, onExcluir }: Props) {
    const getIconeTipo = (tipo: string) => {
        switch (tipo) {
            case "Parque": return "🌳";
            case "Hidratação": return "🚰";
            case "Trabalho": return "💼";
            case "Lazer": return "🎡";
            default: return "📍";
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.icon}>{getIconeTipo(tipoLocal)}</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{nomeLocal}</Text>
                    <Text style={styles.referencia}>{referencia}</Text>
                </View>
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity onPress={onEditar} style={styles.editButton}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onExcluir} style={styles.deleteButton}>
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginVertical: 10,
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderColor: '#e0e0e0',
        borderWidth: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    icon: {
        fontSize: 28,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
        color: '#003EAA',
    },
    referencia: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    editButton: {
        backgroundColor: '#003EA6',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    deleteButton: {
        backgroundColor: '#FF4D4D',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 13,
    },
});