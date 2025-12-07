'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface LinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (url: string) => void;
  initialUrl?: string;
}

export function LinkDialog({ isOpen, onClose, onSave, initialUrl = '' }: LinkDialogProps) {
  const [url, setUrl] = useState(initialUrl);

  const handleSave = () => {
    let finalUrl = url.trim();
    
    if (finalUrl && !finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }
    
    onSave(finalUrl);
    onClose();
    setUrl('');
  };

  const handleRemove = () => {
    onSave('');
    onClose();
    setUrl('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Link</DialogTitle>
          <DialogDescription>
            Enter the URL you want to link to.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              autoFocus
            />
          </div>
        </div>
        
        <DialogFooter className="flex gap-2">
          {initialUrl && (
            <Button variant="destructive" onClick={handleRemove}>
              Remove Link
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!url.trim()}>
            Save Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}