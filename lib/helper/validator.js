const isFieldsEmpty = (...fields) => {
    for (let field of fields) {
        if (!!!field) return true
    }

    return false
}

export default {isFieldsEmpty}