from flask import Flask, render_template
import pandas as pd
app = Flask(__name__)
df = pd.read_csv('mastertable.csv')


@app.route('/')
def hello_world():
    return render_template('main.html',asgs=0,mvps=0,fmvps=0,dpoys=0,rings=0)

@app.route('/results<int:pasgs>,<int:pmvps>,<int:pfmvps>,<int:pdpoys>,<int:prings>')
def find(pasgs,pmvps,pfmvps,pdpoys,prings):
    if pasgs + pmvps + pfmvps + pdpoys + prings == 0:
        return render_template('main.html', names = 'Must have at least one award',asgs=pasgs,mvps=pmvps,fmvps=pfmvps,dpoys=pdpoys,rings=prings,prompt = "Please enter at least one award")
    
    filtered = df[(df['ASG'] >= pasgs) & (df['MVP'] >= pmvps) & (df['FMVP'] >= pfmvps) & (df['DPOY'] >= pdpoys) & (df['Rings'] >= prings)]
    target_names = filtered['Player'].to_list()
    return render_template('main.html', names = target_names,asgs=pasgs,mvps=pmvps,fmvps=pfmvps,dpoys=pdpoys,rings=prings)

@app.route('/results<int:pasgs>,<int:pmvps>,<int:pfmvps>,<int:pdpoys>,<int:prings>/player/<string:name>')
def show_player_info(pasgs,pmvps,pfmvps,pdpoys,prings,name):
    filtered = df[(df['ASG'] >= pasgs) & (df['MVP'] >= pmvps) & (df['FMVP'] >= pfmvps) & (df['DPOY'] >= pdpoys) & (df['Rings'] >= prings)]
    target_names = filtered['Player'].to_list()
    filtered['Player'] = filtered['Player'].str.replace(" ","_")
    xasgs = filtered.loc[filtered['Player'] == name]['ASG'].item()
    xmvps = filtered.loc[filtered['Player'] == name]['MVP'].item()
    xfmvps = filtered.loc[filtered['Player'] == name]['FMVP'].item()
    xdpoys = filtered.loc[filtered['Player'] == name]['DPOY'].item()
    xrings = filtered.loc[filtered['Player'] == name]['Rings'].item()
    player_stats = [xasgs,xmvps,xfmvps,xdpoys,xrings]
    image = filtered.loc[filtered['Player'] == name]['Pic'].item()
    return render_template('main.html', names = target_names,asgs=pasgs,mvps=pmvps,fmvps=pfmvps,dpoys=pdpoys,rings=prings,stats = player_stats,player_name = name,player_image = image)

