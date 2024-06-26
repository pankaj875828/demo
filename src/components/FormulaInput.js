import React, { useState, useEffect } from 'react';
import useStore from '../store';
import { useSuggestions } from '../api';
import { evaluateFormula } from '../utils';
import Tag from './Tag';

const FormulaInput = () => {
    const { formula, setFormula } = useStore();
    const [input, setInput] = useState('');
    const [lastWord, setLastWord] = useState('');
    const { data: suggestions, error } = useSuggestions(lastWord);

    useEffect(() => {
        const words = input.split(/[\s()+\-*/^]/);
        setLastWord(words[words.length - 1]);
    }, [input]);

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        setFormula(value);
    };

    const removeTag = (index) => {
        const newFormula = formula.split(' ').filter((_, i) => i !== index).join(' ');
        setFormula(newFormula);
        setInput(newFormula);
    };

    const result = evaluateFormula(formula);

    return (
        <div>
            <div>
                {formula.split(' ').map((word, index) => (
                    <Tag key={index} value={word} onRemove={() => removeTag(index)} />
                ))}
            </div>
            <input
                value={input}
                onChange={handleChange}
                placeholder="Enter formula"
            />
            {error ? <div>Error fetching suggestions: {error.message}</div> : null}
            <div>
                {suggestions?.map(suggestion => (
                    <div key={suggestion}>{suggestion}</div>
                ))}
            </div>
            <div>
                Result: {result}
            </div>
        </div>
    );
};

export default FormulaInput;
