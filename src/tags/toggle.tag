<toggle>
    Toggle Button: <button type="button" onClick={toggleButton}>{isOn ? 'Turn off' : 'Turn on'}</button>

<script>
this.isOn = true;

this.toggleButton = e => {
    this.isOn = !this.isOn;
    this.update();
};
    
</script>
</toggle>