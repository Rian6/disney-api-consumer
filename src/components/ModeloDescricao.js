import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

export const ModeloDescricao = (tipo) => {
    if (tipo.tipo.length != 0) {
        return (
            <div>
                <h4>{tipo.nome}</h4>
                {tipo.tipo.map((value) =>
                    <Chip style={{
                        backgroundColor: '#e63946',
                        color: 'white',
                        margin: 2
                    }} label={value} />)}
                <Divider />
            </div>
        )
    } else {
        return (
            null
        )
    }
};