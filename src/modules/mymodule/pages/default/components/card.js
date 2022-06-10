import React from 'react';
import Button from '@common_button';
import useStyles from './style';

const Card = (props) => {
    const styles = useStyles();
    const { img } = props;
    const { t } = props;

    return (
        <div className={styles.border}>
            <img
                src={img}
                alt={t}
            />
            <h1 className={styles.title}>{t}</h1>
            <Button>Add to Cart</Button>
        </div>
    );
};

export default Card;
