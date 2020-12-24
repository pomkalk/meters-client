import React from 'react'

const Logo = ({showTitle}) => {
    const logodata=` data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHDSURBVEiJtdaxaxVBEAbw38aksLKRR8AioKCYysKACGqwElEMIug/ILxGrGzTafMa06UVbEQigjYqqLGwEcFCElAs7ESwkJSCa3GzZPN83tMz+eCY2WVnvpv5drhLOWc1UkrTeIQp/4YfOJ9z/lJvTo44OI23uIEDsfcpbNt6ELFjCQpuRYAqaNz6N7QRTOFm+P2w49aHUkp1ju9tBF9xL/y/sT1cwrcqx4U2ggEehF963rYeaCq6GGS3cWwypfQ0Ngp244XuGlzGfczTaNDDUeyNA/twVTcN4DPO4XohgLPVoSdhu2gAy+Gv1QQf8LBKfFg3DWAJr0o5OzEHP3ESKzXBQSyEX1rUVYN57MF7LBaCN9gV/oamRV01eI2PuDNcwenw34XtqsEW7IQGx2226Fp9i56Hv4E53TV4iQlDczCnGS7+fw4mNNe0B0nT8yuaq1USn8k51281FimlZc2Q7Y/kK3jWpkEdfEpzs2qs55xXRxzvB8E6TTlszsECZkYELYU9EU+9N4wZPC4v1DYHW5BzXi4fk/D/1MKix1302+agE3LOi8VPKTUVRC9XY/OI5lZtCxJmc85rFeu2/baklGZ/AXNhoY5PlOQIAAAAAElFTkSuQmCC`
    return (<div style={{display: 'flex', alignItems: 'center'}}>
                <img src={logodata} />
                <h3 style={{marginLeft: '12px', marginBottom: '0'}}>
                    {showTitle&&'Панель администратора'}
                </h3>
            </div>)
}

export default Logo
