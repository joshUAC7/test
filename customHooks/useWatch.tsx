
import { useEffect, useMemo, useRef } from 'react';

export function useWatchStateChange(callback:any, dependencies:any) {
    const initialRefVal = useMemo(() => dependencies.map(() => null), []);
    const refs = useRef(initialRefVal);
    useEffect(() => {
        for(let [index, dep] of dependencies.entries()) {
            //dep = typeof(dep) === 'object' ? JSON.stringify(dep) : dep;
            console.log(index)
            const ref = refs.current[index];
            if(ref !== dep) {
                callback(index, ref, dep);
                refs.current[index] = dep;
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
}
