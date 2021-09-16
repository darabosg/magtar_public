import {DoneIcon} from '../components/Icons'

const getStatus = (data, part) => {
    return data.process[part].tune.status
        ? 'tuned'
        : data.process[part].shape.status
        ? 'shaped'
        : data.process[part].dimple.status
        ? 'dimpled'
        : data.process[part].draw.status
        ? 'drawed'
        : '-'
}

const getWholeStatus = (data) => {
    return data.process.whole.finish.status ? (
        <DoneIcon />
    ) : data.process.whole.nano.status ? (
        'nanoed'
    ) : data.process.whole.finetune.status ? (
        'finetuned'
    ) : data.process.whole.flex.status ? (
        'flexed'
    ) : data.process.whole.glue.status ? (
        'glued'
    ) : (
        `top: ${getStatus(data,'top')}
            
                    ${
                        data.instrument.hasBottom
                            ? `bot: ${getStatus(data, 'bottom')}`
                            : ''
                    }`
    )
}

export default getWholeStatus